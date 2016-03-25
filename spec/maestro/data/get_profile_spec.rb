require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetProfile do
      let!(:request) { stub_maestro_request(:get, path, query) }
      let(:path)     { '/v1/lms/profile' }
      let(:query)    { "token=#{token}" }
      let(:response) { described_class.call(session) }
      let(:session)  { double('Session', token: token) }
      let(:topic_id) { 1 }
      let(:token)    { 'token' }

      it_behaves_like 'an HTTP error handling service'

      it 'sends the proper HTTP request' do
        response
        expect(request).to have_been_requested
      end

      it 'returns instance of Profile' do
        request.and_return(body: '{"email": "email@example.com"}')
        expect(response).to be_kind_of(Profile)
        expect(response.email).to eq('email@example.com')
      end
    end
  end
end
