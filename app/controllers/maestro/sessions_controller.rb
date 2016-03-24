require_dependency "maestro/application_controller"

module Maestro
  class SessionsController < ApplicationController
    def create
      if Signature.valid?(signature_params)
        session[:maestro_token] = signature_params[:token]
        instance_exec(&Maestro.config.after_session_create)
      else
        instance_exec(&Maestro.config.after_invalid_signature)
      end
    end

    def destroy
      if maestro_session.valid?
        Maestro::Data::DeleteSession.call(maestro_session)
        session.delete(:maestro_token)
        redirect_to redirect_url
      else
        instance_exec(&Maestro.config.after_invalid_session)
      end
    end

    private

    def redirect_url
      params[:return_url].presence || main_app.root_url
    end

    def signature_params
      @signature_params ||= request.query_parameters
    end
  end
end
