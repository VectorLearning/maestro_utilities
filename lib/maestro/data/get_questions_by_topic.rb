module Maestro
  module Data
    module GetQuestionsByTopic
      class Response < Model
        attribute :questions, Array[::Maestro::Data::Question]
        attribute :topic, ::Maestro::Data::CompetencyTopic
      end

      extend HttpService

      def self.call(session, topic_ids)
        response = Maestro.connection.get do |request|
          request.url "/v1/lms/questions"
          request.params['token'] = session.is_a?(String) ? session : session.token
          request.params['topic_ids'] = topic_ids
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        data
      end
    end
  end
end
