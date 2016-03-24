require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetQuestionsByTopic do
      let(:path)     { "/v1/lms/competency_topics/#{topic_id}/questions" }
      let(:query)    { "token=#{token}" }
      let(:session)  { double('Session', token: token) }
      let(:topic_id) { 1 }
      let(:token)    { 'token' }

      def response_data
        {
          questions: [{
            answers: [{correct: true, text: 'Answer Text'}],
            id: 1,
            text: 'Question Text?'
          }]
        }
      end

      it 'sends the proper HTTP request' do
        request = stub_maestro_request(:get, path, query)
        described_class.call(session, topic_id)
        expect(request).to have_been_requested
      end

      it 'returns array of Question' do
        stub_maestro_request(:get, path, query)
          .and_return(body: JSON.generate(response_data))
        response = described_class.call(session, topic_id)
        expect(response).to be_kind_of(GetQuestionsByTopic::Response)
        expect(response.questions).to match_array([kind_of(Question)])
        expect(response.questions.first.text).to eq('Question Text?')
        expect(response.questions.first.answers).to match_array([kind_of(Answer)])
        expect(response.questions.first.answers.first.text).to eq('Answer Text')
      end

      it 'throws ResponseError if response not successful' do
        stub_maestro_request(:get, path, query).and_return(status: 405)
        expect { described_class.call(session, topic_id) }.to raise_error(ResponseError)
      end
    end
  end
end
