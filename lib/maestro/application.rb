require 'maestro'
require 'maestro/connection'

require 'json'

module Maestro
  class Application
    def self.register
      raise ConfigurationError, "A value for `app_id` is required" unless Maestro.config.app_id

      response = Maestro.connection.put do |request|
        request.url '/v%s/applications/%s' % [Maestro.config.api_version, Maestro.config.app_id]
        request.headers['Content-Type'] = 'application/json'
        request.body = JSON.generate({
          application: {
            api_methods: Maestro.config.api_methods,
            launch_url: Maestro.config.launch_url,
          }
        })
      end

      raise Error, "Could not register application" unless response.success?
    end
  end
end
