require 'spec_helper'

module Maestro
  module Data
    RSpec.describe UpdateUserCourse do
      let!(:request)  { stub_maestro_request(:put, path).with(body: json) }
      let(:body)      { {results: results, token: token} }
      let(:results)   { {passed: true, score: 80} }
      let(:id)        { 1 }
      let(:json)      { JSON.generate(body) }
      let(:path)      { "/v1/lms/profile/courses/#{id}" }
      let(:response)  { described_class.call(session, id, results) }
      let(:session)   { double('Session', token: token) }
      let(:token)     { 'token' }

      it_behaves_like 'an HTTP error handling service'

      it 'sends the proper HTTP request' do
        response
        expect(request).to have_been_requested
      end
    end
  end
end
