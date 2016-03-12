require_relative '../../lib/maestro/configuration'

RSpec.describe Maestro do
  it 'can be configured' do
    expect {
      described_class.configure do |config|
        config.seed = 'seed'
      end
    }.to_not raise_error
  end

  it 'raises ConfigurationError when no seed provided' do
    expect {
      described_class.configure do |config|
      end
    }.to raise_error(Maestro::ConfigurationError)
  end

  context '#config' do
    before do
      described_class.configure do |config|
        config.seed = 'seed'
      end
    end

    it 'returns the provided seed' do
      expect(described_class.config.seed).to eq('seed')
    end
  end
end
