require_relative '../../lib/maestro/application'

RSpec.describe Maestro::Application do
  context 'correctly configured' do
    before do
      configure_maestro do |config|
        config.app_id = 'app-id'
        config.launch_urls = {
          full_window: 'http://app.maestro.url/'
        }
      end
    end

    describe '.register' do
      it 'sends application register request to Maestro' do
        request = stub_maestro_request(:put, "/v1/applications/app-id")
          .with(body: {application: {launch_urls: {full_window: 'http://app.maestro.url/'}}})
        described_class.register
        expect(request).to have_been_requested
      end
    end
  end

  context 'incorrectly configured' do
    before do
      Maestro.configure do |config|
        config.seed = 'seed'
      end
    end

    describe '.register' do
      it 'raises ConfigurationError' do
        expect { described_class.register }.to raise_error(Maestro::ConfigurationError)
      end
    end
  end
end
