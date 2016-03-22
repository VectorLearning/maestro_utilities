require 'active_support/dependencies/autoload'
require 'maestro/connection'
require 'virtus'

module Maestro
  module Data
    extend ActiveSupport::Autoload

    Error         = Class.new(StandardError)
    ResponseError = Class.new(Error)

    class Model
      include Virtus.model
    end

    # Data Objects
    autoload :CompetencyTopic
    autoload :DeleteSession
    autoload :Profile
    autoload :Session

    # Service Objects
    autoload :GetCompetencyTopics
    autoload :GetProfile
    autoload :GetSession
  end
end
