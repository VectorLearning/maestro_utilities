module Maestro
  module Data
    module GetAuthentication
      extend HttpService

      def self.call(session, username, password, lms_id, app_id)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/authentication'
          request.params['username'] = username
          request.params['password'] = password
          request.params['lms_id'] = lms_id
          request.params['app_id'] = app_id
        end
        ensure_successful_response(response)
        parse_json(response.body)
      end
    end
  end
end
