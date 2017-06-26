module Maestro
  module Data
    module GetAuthentication
      extend HttpService

      def self.call(session, username, password)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/authentication'
          request.params['username'] = username
          request.params['password'] = password
        end
        ensure_successful_response(response)
        parse_json(response.body)
      end
    end
  end
end
