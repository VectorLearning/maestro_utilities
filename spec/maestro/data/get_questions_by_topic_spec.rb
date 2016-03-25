require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetQuestionsByTopic do
      let!(:request) { stub_maestro_request(:get, path, query) }
      let(:path)     { "/v1/lms/competency_topics/#{topic_id}/questions" }
      let(:query)    { "token=#{token}" }
      let(:response) { described_class.call(session, topic_id) }
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

      it_behaves_like 'an HTTP error handling service'

      it 'sends the proper HTTP request' do
        response
        expect(request).to have_been_requested
      end

      it 'returns array of Question' do
        request.and_return(body: JSON.generate(response_data))
        expect(response).to be_kind_of(GetQuestionsByTopic::Response)
        expect(response.questions).to match_array([kind_of(Question)])
        expect(response.questions.first.text).to eq('Question Text?')
        expect(response.questions.first.answers).to match_array([kind_of(Answer)])
        expect(response.questions.first.answers.first.text).to eq('Answer Text')
      end
    end
  end
end
