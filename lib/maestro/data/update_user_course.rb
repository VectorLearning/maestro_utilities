module Maestro
  module Data
    module UpdateUserCourse
      extend HttpService

      def self.call(session, course_id, results=nil)
        response = Maestro.connection.put do |request|
          request.body = JSON.generate(results: results,
                                       token: session.token)
          request.headers['Content-Type'] = 'application/json'
          request.url("/v1/lms/profile/courses/#{course_id}")
        end

        ensure_successful_response(response)
      end
    end
  end
end
