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

require 'maestro/data/get_profile'
require 'maestro/data/profile'
