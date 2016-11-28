module Maestro
  module Data
    module GetUsersGroups
      extend HttpService

      def self.call(session, user_id)
        response = Maestro.connection.get do |request|
          request.url "/v1/lms/users/#{user_id}/groups"
          request.params['token'] = session.token
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        headers = response.headers

        groups = data.fetch('groups', [])
          .map { |data| ::Maestro::Data::Group.new(data) }

        { headers: headers, groups: groups }
      end
    end
  end
end
