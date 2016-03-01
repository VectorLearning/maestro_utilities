$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)
require 'maestro'
require 'webmock/rspec'

Maestro.configure do |config|
  config.seed = 'seed'
end
