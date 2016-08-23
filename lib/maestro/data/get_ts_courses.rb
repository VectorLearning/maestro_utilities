module Maestro
  module Data
    module GetTsCourses
      extend HttpService

      def self.call(session)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/ts_courses'
          request.params['token'] = session.token
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        headers = response.headers

        ts_courses = data.fetch('ts_courses', [])
          .map { |data| ::Maestro::Data::TsCourse.new(data) }

        { headers: headers, ts_courses: ts_courses }
      end
    end
  end
end
