module Maestro
  module ControllerHelper
    def self.included(controller)
      controller.before_filter(:set_maestro_session)
    end

    private

    def check_signature?
      signature_params.key?(:expires) &&
        signature_params.key?(:signature) &&
        signature_params.key?(:token)
    end

    def set_maestro_session
      if check_signature?
        if Maestro::Signature.valid?(signature_params)
          session[:maestro_token] = signature_params[:token]
        else
          instance_exec(&Maestro.config.after_invalid_signature)
        end
      end
    end

    def signature_params
      @signature_params ||= request.query_parameters
    end
  end
end
