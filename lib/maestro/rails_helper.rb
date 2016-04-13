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
        role: "user",
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

    def with_valid_maestro_session expires: 1.hour.from_now.to_i, token: SecureRandom.urlsafe_base64(32)
      uri = URI.parse(Maestro.config.host)
      uri.user = Maestro.config.auth_name
      uri.password = Maestro.config.auth_pass
      uri.path = '/v1/sessions'
      stub_request(:patch, uri)
        .with(:body => {session: {token: token}})
        .and_return(body: JSON.generate(session_data(expires, token)))
      params = {token: token, expires: expires}
      signed = Maestro::Signature.new(params).to_query
      visit("/?%s" % signed)
    end

    def session_data(expires, token)
      {
        token: token,
        app_id: Maestro.config.app_id,
        lms_id: "TargetSolutions",
        launch_url: "http://knowledgeassessment.dev/sessions",
        expires_at: Time.at(expires),
        expires_at_epoch: expires,
        lms_data: {
          lms_id: "TargetSolutions",
          user_id: "1234",
          organization_id: "1234",
          organization_name: "San Diego Fire-Rescue Department",
          first_name: "Jason",
          last_name: "Paluck",
          email: "jason.paluck@redvector.com",
          role: "user",
          app_id: Maestro.config.app_id,
          api_key: "gjhg76tv4rhcc73",
          lms_navigation: {
            navbar: {
              links: [
                {link: "#", text: "Home"}
              ]
            }
          }
        }
      }
    end
  end

  feature_class_helpers = Module.new do
    def create_session_on_maestro(data: {})
      before(:each) do
        create_session_on_maestro(data)
      end
    end

    def with_valid_maestro_session expires: 1.hour.from_now.to_i, token: SecureRandom.urlsafe_base64(32)
      before(:each) do
        with_valid_maestro_session(expires: expires, token: token)
      end
    end
  end

  config.include(feature_instance_helpers, type: :feature)
  config.include(feature_instance_helpers, type: :request)
  config.extend(feature_class_helpers, type: :feature)
  config.extend(feature_class_helpers, type: :request)
end
