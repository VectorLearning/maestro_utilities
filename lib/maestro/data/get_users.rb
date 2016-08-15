module Maestro
  module Data
    module GetUsers
      extend HttpService

      def self.call(session, groups)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/users'
          request.params['token'] = session.token
          request.params['groups'] = groups
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        headers = response.headers

        users = data.fetch('users', [])
          .map { |data| ::Maestro::Data::User.new(data) }

        { headers: headers, users: users }
      end
    end
  end
end
