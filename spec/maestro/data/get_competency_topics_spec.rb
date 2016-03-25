require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetCompetencyTopics do
      let!(:request) { stub_maestro_request(:get, path, query) }
      let(:path)     { '/v1/lms/competency_topics' }
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

      it 'returns array of CompetencyTopic' do
        request
          .and_return(body: '{"topics": [{"id": 1, "name": "Topic Name"}]}')
        expect(response).to match_array([kind_of(CompetencyTopic)])
        expect(response.first.name).to eq('Topic Name')
      end
    end
  end
end
