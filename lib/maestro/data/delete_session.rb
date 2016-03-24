module Maestro
  module Data
    module DeleteSession
      def self.call session
        Maestro.connection.delete do |request|
          request.url '/v1/sessions'
          request.headers['Content-Type'] = 'application/json'
          request.body = JSON.generate({
            session: {
              token: session.token
            }
          })
        end
      end
    end
  end
end
