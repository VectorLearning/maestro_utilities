require 'spec_helper'
require 'active_support/all'

describe Maestro::Signature do
  describe '.valid?' do
    let(:expires) { Time.now.utc.to_i }
    let(:params) { { one: 1, two: 2, expires: expires } }
    let(:signature) { described_class.new(params).signature }

    it 'verifies that the signature matches the query parameters' do
      valid = described_class.valid?(params.merge(signature: signature))
      expect(valid).to be true
    end

    context 'when the query has expired' do
      let(:expires) { 15.minute.ago.to_i }

      it 'fails verification' do
        valid = described_class.valid?(params.merge(signature: signature))
        expect(valid).to be false
      end
    end

    context 'without an expiration' do
      let(:params) { { one: 1, two: 2 } }

      it 'fails verification' do
        valid = described_class.valid?(params.merge(signature: signature))
        expect(valid).to be false
      end
    end

    context 'when the signature does not match' do
      it 'fails verification' do
        valid = described_class.valid?(params.merge(signature: 'invalid'))
        expect(valid).to be false
      end
    end

    context 'without a signature' do
      it 'fails verification' do
        valid = described_class.valid?(params)
        expect(valid).to be false
      end
    end
  end

  describe '#signature' do
    let(:seed) { 'secret' }

    it 'produces a secure hash of the given query parameters' do
      params = { one: 1, two: 2 }
      signature = described_class.new(params, seed: seed).signature

      expect(signature).to eq signature('one=1&two=2')
    end

    it 'sorts the query parameters before hashing' do
      params = { one: 1, two: 2, three: 3 }
      signature = described_class.new(params, seed: seed).signature

      expect(signature).to eq signature('one=1&three=3&two=2')
    end

    it 'handles nested parameters' do
      params = { numbers: { one: 1, two: 2 } }
      signature = described_class.new(params, seed: seed).signature

      expect(signature).to eq signature('numbers%5Bone%5D=1&numbers%5Btwo%5D=2')
    end
  end

  describe '#to_query' do
    let(:seed) { 'secret' }

    it 'includes the original query parameters' do
      params = { one: "1", two: "2" }
      query = CGI::parse(described_class.new(params, seed: seed).to_query)
      expect(query['one'][0]).to eq(params[:one])
      expect(query['two'][0]).to eq(params[:two])
    end

    it 'includes the signature for the query' do
      params = { one: "1", two: "2" }
      query = described_class.new(params, seed: seed).to_query
      signature = described_class.new(params, seed: seed).signature
      expect(CGI::parse(query)['signature'][0]).to eq(signature)
    end
  end

  def signature(text)
    digest = OpenSSL::Digest.new('sha256')
    signature = OpenSSL::HMAC.digest(digest, seed, text)
    Base64.encode64(signature).chomp.gsub('+', '_')
  end
end
