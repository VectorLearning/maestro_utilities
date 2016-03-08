require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetProfile do
      let(:session) { double('Session', token: token) }
      let(:token)   { 'token' }

      it 'sends the proper HTTP request' do
        request = stub_maestro_request(:get, "/v1/lms/profile", "token=#{token}")
        described_class.call(session)
        expect(request).to have_been_requested
      end

      it 'returns instance of Profile' do
        stub_maestro_request(:get, "/v1/lms/profile", "token=#{token}")
          .and_return(body: '{"email": "email@example.com"}')
        profile = described_class.call(session)
        expect(profile).to be_kind_of(Profile)
        expect(profile.email).to eq('email@example.com')
      end

      it 'throws ResponseError if response not successful' do
        stub_maestro_request(:get, "/v1/lms/profile", "token=#{token}")
          .and_return(status: 405)
        expect { described_class.call(session) }.to raise_error(ResponseError)
      end
    end
  end
end
