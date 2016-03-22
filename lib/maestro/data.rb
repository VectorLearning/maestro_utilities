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

require 'maestro/data/competency_topic'
require 'maestro/data/delete_session'
require 'maestro/data/get_competency_topics'
require 'maestro/data/get_profile'
require 'maestro/data/get_session'
require 'maestro/data/profile'
require 'maestro/data/session'
