module Maestro
  module Data
    module GetCompetencyTopics
      def self.call(session)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/competency_topics'
          request.params['token'] = session.token
        end

        raise ::Maestro::Data::ResponseError unless response.success?

        data = JSON.parse(response.body.presence || '{}')
        data.fetch('topics', [])
          .map { |data| ::Maestro::Data::CompetencyTopic.new(data) }
      end
    end
  end
end
