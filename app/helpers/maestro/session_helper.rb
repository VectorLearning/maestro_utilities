module ::Maestro
  module SessionHelper

    def maestro_session
      @maestro_session ||= Maestro::Session.fetch(session[:maestro_token])
    end

    def navigation_stylesheet
      "maestro/themes/#{maestro_session.lms_id.downcase}_theme"
    end

    def navigation_javascript
      "maestro/components/#{maestro_session.lms_id.downcase}/components"
    end

    def lms_data
      maestro_session.lms_data
    end

  end
end
