require 'webmock'

def with_valid_maestro_session expires: 1.hour.from_now.to_i, token: SecureRandom.urlsafe_base64(32)
  before(:each) do
    uri = URI.parse(Maestro.config.host)
    uri.user = Maestro.config.auth_name
    uri.password = Maestro.config.auth_pass
    uri.path = '/v1/sessions'
    stub_request(:patch, uri)
      .with(:body => {session: {token: token}})
      .and_return(body: JSON.generate(session_data(expires, token)))
    params = {token: token, expires: expires}
    signed = Maestro::Signature.new(params).to_query
    visit("/sessions?%s" % signed)
  end
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
