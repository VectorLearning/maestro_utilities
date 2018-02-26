module Maestro
  module Data
    module UpdateUserAssessment
      extend HttpService

      def self.call(session, assessment_id, status, topic_results=[], assessment_title="")
        response = Maestro.connection.put do |request|
          request.body = JSON.generate(status: status,
                                       topic_results: topic_results,
                                       token: session.token,
                                       title: assessment_title)
          request.headers['Content-Type'] = 'application/json'
          request.url("/v1/lms/profile/assessments/#{assessment_id}")
        end

        ensure_successful_response(response)
      end
    end
  end
end
