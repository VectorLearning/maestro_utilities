require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetUsers do
      let!(:request) { stub_maestro_request(:get, path, query) }
      let(:path)     { '/v1/lms/users' }
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

      it 'returns array of User' do
        request
          .and_return(body: '{"users": [{"id": 1, "first_name": "User Name"}]}')
        expect(response).to match_array([kind_of(User)])
        expect(response.first.first_name).to eq('User Name')
      end
    end
  end
end
