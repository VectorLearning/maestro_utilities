module Maestro
  module Data
    module GetTsCourses
      extend HttpService

      def self.call(session, startrow, limit, coursename)
        response = Maestro.connection.get do |request|
          request.body = JSON.generate(start: startrow,
                                       length: limit,
                                       coursename: coursename,
                                       token: session.token)
          request.headers['Content-Type'] = 'application/json'
          request.url("/v1/lms/ts_courses")
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        
        data
      end
    end
  end
end
