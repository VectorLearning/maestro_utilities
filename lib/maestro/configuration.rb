module Maestro
  Configuration = Struct.new(:app_id, :auth_name, :auth_pass, :host, :launch_urls, :seed)

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
