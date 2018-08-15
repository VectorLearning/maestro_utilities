$LOAD_PATH.unshift File.expand_path('../../lib', __FILE__)
require 'maestro'
require 'webmock/rspec'

maestro_helper = Module.new do
  def configure_maestro
    Maestro.configure do |config|
      config.auth_name = 'name'
      config.auth_pass = 'pass'
      config.host      = 'http://maestro.url'
      config.seed      = 'seed'
      yield(config) if block_given?
    end
  end

  def maestro_uri path=nil, query=nil
    URI.parse(Maestro.config.host).tap do |uri|
      uri.path     = path if path
      uri.query    = query if query
    end
  end

  def stub_maestro_request method, path=nil, query=nil
    stub_request(method, maestro_uri(path, query).to_s)
  end
end

# Requires supporting ruby files with custom matchers and macros, etc.
Dir[File.expand_path('../support/**/*.rb', __FILE__)].each { |file| require file }

RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.filter_run :focus
  config.run_all_when_everything_filtered = true
  config.disable_monkey_patching!

  if config.files_to_run.one?
    config.default_formatter = 'doc'
  end

  # Allows RSpec to persist some state between runs in order to support
  # the `--only-failures` and `--next-failure` CLI options. We recommend
  # you configure your source control system to ignore this file.
  config.example_status_persistence_file_path = "spec/example-status.txt"

  config.include(maestro_helper)
  config.before(:each) { configure_maestro }

  config.order = :random
  Kernel.srand config.seed
end
