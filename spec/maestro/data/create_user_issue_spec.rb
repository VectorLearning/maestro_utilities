require 'spec_helper'

module Maestro
  module Data
    RSpec.describe CreateUserIssue do
      let!(:request)  { stub_maestro_request(:post, path).with(body: json) }
      let(:body)      { {issue: issue, token: token} }
      let(:course_id) { 1 }
      let(:issue)     { {course_id: course_id, text: text} }
      let(:json)      { JSON.generate(body) }
      let(:path)      { '/v1/lms/profile/issues' }
      let(:response)  { described_class.call(session, course_id, text) }
      let(:session)   { double('Session', token: token) }
      let(:text)      { 'text' }
      let(:token)     { 'token' }

      it_behaves_like 'an HTTP error handling service'

      it 'sends the proper HTTP request' do
        response
        expect(request).to have_been_requested
      end
    end
  end
end
