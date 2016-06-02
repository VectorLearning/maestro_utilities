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

        body = response.body
        data = body == 'null' ? JSON.parse('{}') : JSON.parse(body)

        if response.success?
          ::Maestro::Data::Session.new(data.merge(valid: true))
        else
          ::Maestro::Data::Session.new(data.merge(valid: false))
        end
      end
    end
  end
end
