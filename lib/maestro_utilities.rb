require "maestro_utilities/errors"
require "maestro_utilities/version"
require 'maestro_utilities/signature'

module MaestroUtilities
  raise ConfigurationError, "No MAESTRO_SEED environment variable found!" unless ENV['MAESTRO_SEED']
end
