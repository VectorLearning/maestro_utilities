module ::Maestro
  module SessionHelper

    def maestro_session
      @maestro_session ||= Maestro::Data::GetSession.call(session[:maestro_token])
    end

    def navigation_stylesheet
      if custom_theme.blank?
        "maestro/themes/#{maestro_session.lms_id.downcase}_theme"
      else
        "maestro/themes/custom/#{custom_theme}_theme"
      end
    end

    def navigation_javascript
      if custom_theme.blank?
        "maestro/components/#{maestro_session.lms_id.downcase}/components"
      else
        "maestro/components/custom/#{custom_theme}/components"
      end
    end

    def lms_data
      maestro_session.lms_data
    end


    private

    def custom_theme
      lms_data["additional_data"]["custom_theme"]
    end
  end
end
