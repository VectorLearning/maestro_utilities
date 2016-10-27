require 'active_support/dependencies/autoload'
require 'maestro/connection'
require 'virtus'

module Maestro
  module Data
    extend ActiveSupport::Autoload

    Error                 = Class.new(StandardError)
    ResponseError         = Class.new(Error)
    GatewayError          = Class.new(ResponseError)
    MethodNotAllowedError = Class.new(ResponseError)
    UnauthorizedError     = Class.new(ResponseError)

    class Model
      include Virtus.model
    end

    # Data Objects
    autoload :Answer
    autoload :CompetencyTopic
    autoload :User
    autoload :SelectedUser
    autoload :Group
    autoload :Category
    autoload :TsCourse
    autoload :DeleteSession
    autoload :Profile
    autoload :Question
    autoload :Session

    # Service Objects
    autoload :GetCompetencyTopics
    autoload :GetUser
    autoload :GetUsers
    autoload :GetSelectedUsers
    autoload :GetGroups
    autoload :GetCategories
    autoload :GetTsCourses
    autoload :GetProfile
    autoload :GetQuestionsByTopic
    autoload :GetSession
    autoload :UpdateUserAssessment
    autoload :UpdateUserCourse

    autoload :HttpService
  end
end
