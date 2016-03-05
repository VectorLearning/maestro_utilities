require 'maestro'

module Maestro
  class Configuration
    attr_writer :after_invalid_session
    attr_writer :after_invalid_signature
    attr_writer :after_session_create

    def after_invalid_session
      @after_invalid_session || ->{ head :unauthorized }
    end

    def after_invalid_signature
      @after_invalid_signature || ->{ head :unauthorized }
    end

    def after_session_create
      @after_session_create || ->{ head :ok }
    end
  end

  class Engine < ::Rails::Engine
    isolate_namespace Maestro

    initializer 'maestro_engine.action_controller' do |app|
      ActiveSupport.on_load :action_controller do
        helper Maestro::Engine.helpers
        include Maestro::Engine.helpers
      end
    end
  end
end
