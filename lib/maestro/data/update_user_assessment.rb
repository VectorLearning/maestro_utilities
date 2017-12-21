module Maestro
  module Data
    module UpdateUserAssessment
      extend HttpService

      def self.call(session, assessment, status, topic_results=[])
        response = Maestro.connection.put do |request|
          request.body = JSON.generate(status: status,
                                       topic_results: topic_results,
                                       token: session.token,
                                       title: assessment.title)
          request.headers['Content-Type'] = 'application/json'
          request.url("/v1/lms/profile/assessments/#{assessment.id}")
        end

        ensure_successful_response(response)
      end
    end
  end
end
