ENV['RAILS_ENV'] ||= 'test'

require 'spec_helper'

require File.expand_path('../../spec/dummy/config/environment.rb',  __FILE__)
ActiveRecord::Migrator.migrations_paths = [File.expand_path('../../spec/dummy/db/migrate', __FILE__)]
ActiveRecord::Migrator.migrations_paths << File.expand_path('../../db/migrate', __FILE__)
require 'rails/test_help'
require 'rspec/rails'

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  config.use_transactional_fixtures = true
  config.infer_spec_type_from_file_location!
  config.filter_rails_from_backtrace!
end
