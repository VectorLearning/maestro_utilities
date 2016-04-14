module Maestro
  module Data
    module UpdateUserAssessment
      extend HttpService

      def self.call(session, assessment_id, data)
        response = Maestro.connection.put do |request|
          request.body = JSON.generate(assessments: data, token: session.token)
          request.headers['Content-Type'] = 'application/json'
          request.url("/v1/lms/profile/assessments/#{assessment_id}")
        end

        ensure_successful_response(response)
      end
    end
  end
end
