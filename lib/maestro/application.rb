require 'maestro'
require 'maestro/connection'

require 'json'

module Maestro
  class Application
    def self.register
      raise ConfigurationError, "A value for `app_id` is required" unless Maestro.config.app_id

      response = Maestro.connection.put do |request|
        request.url '/v1/applications/%s' % Maestro.config.app_id
        request.headers['Content-Type'] = 'application/json'
        request.body = JSON.generate({
          application: {
            launch_urls: Maestro.config.launch_urls
          }
        })
      end

      raise Error, "Could not register application" unless response.success?
    end
  end
end
