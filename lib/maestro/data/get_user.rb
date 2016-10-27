module Maestro
  module Data
    module GetUser
      extend HttpService

      def self.call(session, id)
        response = Maestro.connection.get do |request|
          request.url "/v1/lms/users/#{id}"
          request.params['token'] = session.token
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        headers = response.headers

        user = ::Maestro::Data::User.new(data['user'])

        { headers: headers, user: user }
      end
    end
  end
end
