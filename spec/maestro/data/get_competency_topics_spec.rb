require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetCompetencyTopics do
      let(:path)    { '/v1/lms/competency_topics' }
      let(:query)   { "token=#{token}" }
      let(:session) { double('Session', token: token) }
      let(:token)   { 'token' }

      it 'sends the proper HTTP request' do
        request = stub_maestro_request(:get, path, query)
        described_class.call(session)
        expect(request).to have_been_requested
      end

      it 'returns array of CompetencyTopic' do
        stub_maestro_request(:get, path, query)
          .and_return(body: '{"topics": [{"id": 1, "name": "Topic Name"}]}')
        topics = described_class.call(session)
        expect(topics).to match_array([kind_of(CompetencyTopic)])
        expect(topics.first.name).to eq('Topic Name')
      end

      it 'throws ResponseError if response not successful' do
        stub_maestro_request(:get, path, query).and_return(status: 405)
        expect { described_class.call(session) }.to raise_error(ResponseError)
      end
    end
  end
end
