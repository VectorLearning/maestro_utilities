module Maestro
  module Data
    module GetProfile
      extend HttpService

      def self.call(session)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/profile'
          request.params['token'] = session.token
        end

        ensure_successful_response(response)

        data = parse_json(response.body)
        ::Maestro::Data::Profile.new(data)
      end
    end
  end
end
