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
        maestro_session.delete
        session.delete(:maestro_token)
        redirect_to maestro_session.return_url
      else
        instance_exec(&Maestro.config.after_invalid_session)
      end
    end

    private

    def signature_params
      @signature_params ||= request.query_parameters
    end
  end
end
