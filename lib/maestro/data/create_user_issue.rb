module Maestro
  module Data
    module CreateUserIssue
      extend HttpService

      def self.call(session, course_run, issue)
        response = Maestro.connection.post do |request|
          request.body = JSON.generate(
            {
              issue: {
                course_id: course_run.course_id,
                email: session[:lms_data][:email],
                enrollment_id: course_run.enrollment_id,
                text: issue[:text],
                user_id: session[:lms_data][:user_id],
                url: issue[:url],
              },
              token: session.token,
            }
          )
          request.headers["Content-Type"] = "application/json"
          request.url("/v1/lms/profile/issues")
        end

        ensure_successful_response(response)

        response
      end
    end
  end
end
