require "maestro/errors"
require "maestro/version"
require 'maestro/signature'

module Maestro
  raise ConfigurationError, "No MAESTRO_SEED environment variable found!" unless ENV['MAESTRO_SEED']
end
