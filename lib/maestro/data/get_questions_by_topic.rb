module Maestro
  module Data
    module GetQuestionsByTopic
      def self.call(session, topic_id)
        response = Maestro.connection.get do |request|
          request.url "/v1/lms/competency_topics/#{topic_id}/questions"
          request.params['token'] = session.token
        end

        raise ::Maestro::Data::ResponseError unless response.success?

        data = JSON.parse(response.body.presence || '{}')
        data.fetch('questions', [])
          .map { |data| ::Maestro::Data::Question.new(data) }
      end
    end
  end
end
