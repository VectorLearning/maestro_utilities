module Maestro
  module Data
    module CreateNotification
      extend HttpService

      def self.call(session, user_id, content, link)
        response = Maestro.connection.post do |request|
          request.body = JSON.generate(token: session.token,
                                       notification: { user_id: user_id,
                                                       content: content,
                                                       link: link })
          request.headers['Content-Type'] = 'application/json'
          request.url("/v1/lms/notifications")
        end

        ensure_successful_response(response)

        response
      end
    end
  end
end
