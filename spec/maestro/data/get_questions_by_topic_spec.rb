require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetQuestionsByTopic do
      let!(:request) { stub_maestro_request(:get, path, query) }
      let(:path)     { "/v1/lms/questions" }
      let(:query)    { "token=#{token}&topic_ids=#{topic_ids}" }
      let(:topic_ids) { "GUID" }
      let(:response) { described_class.call(session, topic_ids) }
      let(:session)  { double('Session', token: token) }
      let(:token)    { 'token' }

      def response_data
        { "topic_questions": [
          {
            "topic_id": "fa50fa96-9080-461f-b69e-09b318c6e319",
            "topic_name": "Boolean Algebra",
            "question_ids": [
              "1a8bc0a0-ca9a-4509-9445-0ea1c0f5df0c",
              "fb9f15a5-13a2-4562-b79e-2145f6a6ecd8"
              ]
            }
          ]
        }
      end

      it_behaves_like 'an HTTP error handling service'

      it 'sends the proper HTTP request' do
        response
        expect(request).to have_been_requested
      end

      it 'returns array of Question GUIDs' do
        request.and_return(body: JSON.generate(response_data))
        expect(response).to be_a_kind_of(Hash)
        expect(response['topic_questions'].first['question_ids']).to eq(
        ["1a8bc0a0-ca9a-4509-9445-0ea1c0f5df0c",
         "fb9f15a5-13a2-4562-b79e-2145f6a6ecd8"])
      end
    end
  end
end
