require_relative 'mock_maestro_session'

module SpecHelpers
  def mock_maestro_session(organization, user)
    MockMaestroSession.new(organization, user)
  end
end
