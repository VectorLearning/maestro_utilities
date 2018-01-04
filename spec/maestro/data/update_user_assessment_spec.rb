require 'spec_helper'

module Maestro
  module Data
    RSpec.describe UpdateUserAssessment do
      let!(:request)        { stub_maestro_request(:put, path).with(body: json) }
      let(:body)            { {status: status, topic_results: topic_results, token: token, title: title} }
      let(:status)          { 'complete' }
      let(:topic_results)   { { topics: [ { id: 1, name: 'topic name', benchmark_percentage: '80', score_percentage: '70', met: 'false' } ] } }
      let(:id)              { 1 }
      let(:title)           { 'Dummy Assessment' }
      let(:json)            { JSON.generate(body) }
      let(:path)            { "/v1/lms/profile/assessments/#{id}" }
      let(:response)        { described_class.call(session, id, status, topic_results, title) }
      let(:session)         { double('Session', token: token) }
      let(:token)           { 'token' }

      it_behaves_like 'an HTTP error handling service'

      it 'sends the proper HTTP request' do
        response
        expect(request).to have_been_requested
      end
    end
  end
end
