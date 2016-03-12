module Maestro
  module SessionHelper
    def maestro_session
      @maestro_session ||= Session.fetch(session[:maestro_token])
    end
  end
end
