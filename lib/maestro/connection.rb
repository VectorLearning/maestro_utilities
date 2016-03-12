require 'faraday'

module Maestro
  def self.connection
    return @connection if @connection
    raise ConfigurationError, "A value for `auth_name` is required" unless config.auth_name
    raise ConfigurationError, "A value for `auth_pass` is required" unless config.auth_pass
    raise ConfigurationError, "A value for `host` is required" unless config.host

    @connection = Faraday.new(url: config.host)
    @connection.basic_auth(config.auth_name, config.auth_pass)
    @connection
  end
end
