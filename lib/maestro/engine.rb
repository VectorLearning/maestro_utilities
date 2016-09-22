require 'maestro'
require 'maestro/data'
require 'react-rails'

module Maestro
  class Configuration
    attr_writer :after_invalid_signature

    def after_invalid_signature
      @after_invalid_signature || ->{ head :unauthorized }
    end
  end

  class Engine < ::Rails::Engine
    config.eager_load_namespaces << Maestro::Data
    isolate_namespace Maestro

    initializer 'maestro_engine.action_controller' do |app|
      ActiveSupport.on_load :action_controller do
        helper Maestro::Engine.helpers
        include Maestro::Engine.helpers
      end
    end

    initializer "maestro_engine.assets.precompile" do |app|
      app.config.assets.precompile += %w(
        maestro/components/centrelearn/components.js
        maestro/components/dummylms/components.js
        maestro/components/redvector/components.js
        maestro/components/targetsolutions/components.js
        maestro/themes/centrelearn_theme.css
        maestro/themes/dummylms_theme.css
        maestro/themes/redvector_theme.css
        maestro/themes/targetsolutions_theme.css
      )
    end
  end
end
