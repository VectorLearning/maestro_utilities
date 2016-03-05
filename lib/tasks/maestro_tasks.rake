namespace :maestro do
  desc 'Registers application with Maestro'
  task register_application: :environment do
    require 'maestro/application'
    Maestro::Application.register
  end
end
