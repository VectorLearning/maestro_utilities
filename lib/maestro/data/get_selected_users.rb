module Maestro
  module Data
    module GetSelectedUsers
      extend HttpService

      def self.call(session)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/selected_users'
          request.params['token'] = session.token
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        headers = response.headers

        selected_users = data.fetch('selected_users', [])
          .map { |data| ::Maestro::Data::Category.new(data) }

        { headers: headers, selected_users: selected_users }
      end
    end
  end
end
