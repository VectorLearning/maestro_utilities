require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetGroups do
      let!(:request) { stub_maestro_request(:get, path, query) }
      let(:path)     { '/v1/lms/groups' }
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
          .and_return(body: '{"groups": [{"id": 1, "name": "GroupName"}]}')
        expect(response.class).to eq Hash
        expect(response.keys).to eq [:headers, :groups]
        expect(response[:groups]).to match_array([kind_of(Group)])
        expect(response[:groups].first.name).to eq('GroupName')
      end
    end
  end
end
