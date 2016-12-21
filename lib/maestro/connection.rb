require 'faraday'

module Maestro
  def self.connection
    return @connection if @connection
    raise ConfigurationError, "A value for `auth_name` is required" unless config.auth_name
    raise ConfigurationError, "A value for `auth_pass` is required" unless config.auth_pass
    raise ConfigurationError, "A value for `host` is required" unless config.host

    @connection = Faraday.new(url: config.host, request: { params_encoder: Faraday::NestedParamsEncoder}) do |connection|
      connection.request  :basic_auth, config.auth_name, config.auth_pass
      connection.response :logger, Maestro.config.logger if Maestro.config.logger
      connection.adapter  Faraday.default_adapter
    end
  end
end
