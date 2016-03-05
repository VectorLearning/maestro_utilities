class ApplicationController < ActionController::Base
  before_filter :authenticate
  protect_from_forgery with: :exception

  private

  def authenticate
    unless maestro_session.valid?
      head :unauthorized
    end
  end
end
