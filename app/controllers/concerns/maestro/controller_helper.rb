module Maestro
  module ControllerHelper
    def self.included(controller)
      controller.before_filter(:set_maestro_session)
      controller.before_filter(:redirect_to_lms_on_session_expiration)
    end

    private

    def set_maestro_session
      if header_params_present?
        if Maestro::Signature.valid?(request_params.merge(header_params))
          session[:maestro_token] = header_params[:token]
        else
          instance_exec(&Maestro.config.after_invalid_signature)
        end
      elsif signature_params_present?
        if Maestro::Signature.valid?(signature_params)
          session[:maestro_token] = signature_params[:token]
        else
          instance_exec(&Maestro.config.after_invalid_signature)
        end
      end
    end

    def header_params_present?
      header_params[:expires].present? &&
        header_params[:signature].present? &&
        header_params[:token].present? &&
        header_params[:token].present? != session[:maestro_token]
    end

    def header_params
      @header_params ||= { token: request.headers['token'],
                           signature: request.headers['signature'],
                           expires: request.headers['expires'] }
    end

    def signature_params_present?
      signature_params.key?(:expires) &&
        signature_params.key?(:signature) &&
        signature_params.key?(:token) &&
        signature_params[:token] != session[:maestro_token]
    end

    def signature_params
      @signature_params ||= request.query_parameters
    end

    def request_params
      @request_params ||= request.query_parameters
    end

    def redirect_to_lms_on_session_expiration
      unless maestro_session.valid?
        lms_host = maestro_session.lms_data['lms_host']
        redirect_to lms_host if lms_host
      end
    end
  end
end
