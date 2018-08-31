require 'webmock'

if defined?(VCR)
  maestro_uri = URI.parse(Maestro.config.host).tap { |uri|
    uri.user     = Maestro.config.auth_name
    uri.password = Maestro.config.auth_pass
  }.to_s

  VCR.configure do |config|
    config.filter_sensitive_data('<MAESTRO-HOST>') { maestro_uri }
  end
end

RSpec.configure do |config|
  feature_instance_helpers = Module.new do
    def create_session_on_maestro session: {}
      data = {
        lms_id: 'DummyLMS',
        lms_host: 'http://maestro-dummy-lms.dev/',
        user_id: "1234",
        organization_id: "1234",
        organization_name: "San Diego Fire-Rescue Department",
        first_name: "Jason",
        last_name: "Paluck",
        email: "jason.paluck@redvector.com",
        role: "admin",
        app_id: Maestro.config.app_id,
        api_key: "gjhg76tv4rhcc73",
        lms_navigation: {
          navbar: {
            links: [
              {link: '#', text: "Home"},
            ]
          },
          subnav: {
            links: [
              {link: '#', text: "Home"},
            ]
          }
        },
        additional_data: {}
      }.deep_merge(session)

      response = Maestro.connection.post do |request|
        headers = request.headers
        headers['Accept'] = headers['Content-Type'] = 'application/json'

        request.url '/v1/sessions'
        request.body = JSON.generate(session: data)
      end

      JSON.parse(response.body)
    end

    def with_valid_maestro_session expires: 1.hour.from_now.to_i, token: SecureRandom.urlsafe_base64(32), user: mock_user, organization: mock_organization, additional_data: {}
      uri = URI.parse(Maestro.config.host)
      # uri.user = Maestro.config.auth_name
      # uri.password = Maestro.config.auth_pass
      uri.path = '/v1/sessions'
      stub_request(:patch, uri).
        with(:body => {session: {token: token}}).
        and_return(
          body: JSON.generate(
            session_data(expires, token, user, organization, additional_data),
          ),
      )
      params = { token: token, expires: expires }
      signed = Maestro::Signature.new(params).to_query
      visit("/?%s" % signed)
    end

    def session_data(expires, token, user, organization, additional_data)
      {
        token: token,
        app_id: Maestro.config.app_id,
        lms_id: organization.lms_id || 'RedVector',
        launch_url: "http://knowledgeassessment.dev/sessions",
        expires_at: Time.at(expires),
        expires_at_epoch: expires,
        lms_data: {
          lms_id: user.lms_id,
          user_id: user.lms_u_id,
          organization_id: organization.lms_organization_id,
          organization_name: organization.name,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role,
          app_id: Maestro.config.app_id,
          api_key: "gjhg76tv4rhcc73",
          lms_navigation: {
            navbar: {
              links: [
                {link: "#", text: "Home"}
              ]
            }
          }
        }.merge(additional_data: additional_data)
      }
    end

    def mock_user
      OpenStruct.new(id: '1234', lms_u_id: '123', first_name: 'Billy', last_name: 'Willis', email: 'example@example.com', role: 'admin')
    end

    def mock_organization
      OpenStruct.new(id: '9876', lms_organization_id: '123',  name: 'Mock Organization')
    end
  end

  feature_class_helpers = Module.new do
    def create_session_on_maestro(data: {})
      before(:each) do
        create_session_on_maestro(data)
      end
    end

    def with_valid_maestro_session expires: 1.hour.from_now.to_i, token: SecureRandom.urlsafe_base64(32), user: mock_user, organization: mock_organization, additional_data: {}
      before(:each) do
        with_valid_maestro_session(expires: expires, token: token, additional_data: additional_data, user: user, organization: mock_organization)
      end
    end
  end

  config.include(feature_instance_helpers, type: :feature)
  config.include(feature_instance_helpers, type: :request)
  config.extend(feature_class_helpers, type: :feature)
  config.extend(feature_class_helpers, type: :request)
end
