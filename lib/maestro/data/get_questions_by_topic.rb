module Maestro
  module Data
    module GetQuestionsByTopic
      class Response < Model
        attribute :questions, Array[::Maestro::Data::Question]
        attribute :topic, ::Maestro::Data::CompetencyTopic
      end

      extend HttpService

      def self.call(session, topic_id)
        response = Maestro.connection.get do |request|
          request.url "/v1/lms/competency_topics/#{topic_id}/questions"
          request.params['token'] = session.is_a?(String) ? session : session.token
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        questions = data.fetch('questions', [])
          .map { |data| ::Maestro::Data::Question.new(data) }
        topic = ::Maestro::Data::CompetencyTopic.new(data['topic'])

        Response.new(questions: questions, topic: topic)
      end
    end
  end
end
