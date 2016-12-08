module Maestro
  module Data
    module CreateBulkNotifications
      extend HttpService

      def self.call(session, user_ids, content, link)
        response = Maestro.connection.post do |request|
          request.body = JSON.generate(token: session.token,
                                       notification: { user_ids: user_ids,
                                                       content: content,
                                                       link: link })
          request.headers['Content-Type'] = 'application/json'
          request.url("/v1/lms/bulk_notifications")
        end

        ensure_successful_response(response)

        response
      end
    end
  end
end
