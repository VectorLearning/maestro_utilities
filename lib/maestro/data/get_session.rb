module Maestro
  module Data
    module GetSession
      def self.call token
        response = Maestro.connection.patch do |request|
          headers = request.headers
          headers['Accept'] = headers['Content-Type'] = 'application/json'

          request.url '/v1/sessions'
          request.body = JSON.generate({
            session: {
              token: token
            }
          })
        end

        if response.success?
          data = JSON.parse(response.body.presence || '{}')
          ::Maestro::Data::Session.new(data.merge(valid: true))
        else
          ::Maestro::Data::Session.new(valid: false)
        end
      end
    end
  end
end
