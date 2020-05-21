class ApplicationController < ActionController::Base
  include Maestro::ControllerHelper
  before_action :authenticate
  protect_from_forgery with: :exception

  private

  def authenticate
    unless maestro_session.valid?
      head :unauthorized
    end
  end
end
