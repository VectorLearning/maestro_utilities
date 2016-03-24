module Maestro
  module Data
    module GetProfile
      def self.call(session)
        response = Maestro.connection.get do |request|
          request.url '/v1/lms/profile'
          request.params['token'] = session.token
        end

        raise ::Maestro::Data::ResponseError unless response.success?

        data = JSON.parse(response.body.presence || '{}')
        ::Maestro::Data::Profile.new(data)
      end
    end
  end
end
