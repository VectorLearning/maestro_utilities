require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetCategories do
      let!(:request) { stub_maestro_request(:get, path, query) }
      let(:path)     { '/v1/lms/categories' }
      let(:query)    { "token=#{token}" }
      let(:response) { described_class.call(session) }
      let(:session)  { double('Session', token: token, user_id: user_id) }
      let(:user_id) { 1 }
      let(:token)    { 'token' }

      it_behaves_like 'an HTTP error handling service'

      it 'sends the proper HTTP request' do
        response
        expect(request).to have_been_requested
      end

      it 'returns result hash' do
        request
          .and_return(body: '{"categories": [{"id": 1, "name": "CategoryName"}]}')
        expect(response.class).to eq Hash
        expect(response.keys).to eq [:headers, :categories]
        expect(response[:categories]).to match_array([kind_of(Category)])
        expect(response[:categories].first.name).to eq('CategoryName')
      end
    end
  end
end
