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
    autoload :Answer
    autoload :CompetencyTopic
    autoload :DeleteSession
    autoload :Profile
    autoload :Question
    autoload :Session

    # Service Objects
    autoload :GetCompetencyTopics
    autoload :GetProfile
    autoload :GetQuestionsByTopic
    autoload :GetSession
  end
end
