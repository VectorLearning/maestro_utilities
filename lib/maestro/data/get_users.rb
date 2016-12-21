module Maestro
  module Data
    module GetUsers
      extend HttpService

      def self.call(session, groups, page, search)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/users'
          request.params['token'] = session.token
          request.params['groups'] = groups if groups
          request.params['page'] = page if page
          request.params['search'] = search if search
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
