module Maestro
  module Data
    module GetCompetencyTopics
      extend HttpService

      def self.call(session)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/competency_topics'
          request.params['token'] = session.token
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        data.fetch('topics', [])
          .map { |data| ::Maestro::Data::CompetencyTopic.new(data) }
      end
    end
  end
end
