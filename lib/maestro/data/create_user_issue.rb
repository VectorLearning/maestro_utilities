module Maestro
  module Data
    module CreateUserIssue
      extend HttpService

      def self.call(session, course_id, text)
        response = Maestro.connection.post do |request|
          request.body = JSON.generate({
            issue: { course_id: course_id, text: text },
            token: session.token,
          })
          request.headers['Content-Type'] = 'application/json'
          request.url('/v1/lms/profile/issues')
        end

        ensure_successful_response(response)

        response
      end
    end
  end
end
