require 'spec_helper'

module Maestro
  module Data
    RSpec.describe UpdateUserAssessment do
      let!(:request) { stub_maestro_request(:put, path).with(body: json) }
      let(:body)     { {assessments: data, token: token} }
      let(:data)     { [] }
      let(:id)       { 1 }
      let(:json)     { JSON.generate(body) }
      let(:path)     { "/v1/lms/profile/assessments/#{id}" }
      let(:response) { described_class.call(session, id, data) }
      let(:session)  { double('Session', token: token) }
      let(:token)    { 'token' }

      it_behaves_like 'an HTTP error handling service'

      it 'sends the proper HTTP request' do
        response
        expect(request).to have_been_requested
      end
    end
  end
end
