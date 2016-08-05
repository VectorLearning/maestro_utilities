module Maestro
  module Data
    module GetUsers
      extend HttpService

      def self.call(session)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/users'
          request.params['token'] = session.token
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        data.fetch('users', [])
          .map { |data| ::Maestro::Data::User.new(data) }
      end
    end
  end
end
