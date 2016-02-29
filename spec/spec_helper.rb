$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)
require 'maestro'

Maestro.configure do |config|
  config.seed = 'seed'
end
