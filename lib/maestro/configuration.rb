module Maestro
  class Configuration < BasicObject
    attr_accessor :app_id
    attr_accessor :auth_name
    attr_accessor :auth_pass
    attr_accessor :host
    attr_accessor :launch_url
    attr_accessor :logger
    attr_accessor :seed
    attr_accessor :debug
  end

  def self.config
    @config
  end

  def self.configure
    config = Configuration.new
    yield config
    raise ConfigurationError, "A value for `seed` is required" unless config.seed
    @config = config
  end
end
