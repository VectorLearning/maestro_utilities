module Maestro
  module Data
    module UpdateSelectedUserList
      extend HttpService

      def self.call(session, user_id, selected_user_list)
        response = Maestro.connection.post do |request|
          request.body = JSON.generate(selected_user_list: {selected_users: selected_user_list},
                                       token: session.token)
          request.headers['Content-Type'] = 'application/json'
          request.url("/v1/lms/users/#{user_id}/selected_user_lists")
        end

        ensure_successful_response(response)

        response
      end
    end
  end
end
