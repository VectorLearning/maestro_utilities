require 'maestro/connection'
require 'virtus'

module Maestro
  module Data
    Error         = Class.new(StandardError)
    ResponseError = Class.new(Error)

    class Model
      include Virtus.model
    end
  end
end

require 'maestro/data/delete_session'
require 'maestro/data/get_profile'
require 'maestro/data/get_session'
require 'maestro/data/profile'
require 'maestro/data/session'
