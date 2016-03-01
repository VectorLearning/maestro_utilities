require 'maestro'

module Maestro
  class Railtie < Rails::Railtie
    rake_tasks do
      namespace :maestro do
        desc 'Registers application with Maestro'
        task register_application: :environment do
          require 'maestro/application'
          Maestro::Application.register
        end
      end
    end
  end
end
