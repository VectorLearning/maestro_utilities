require 'spec_helper'

module Maestro
  module Data
    RSpec.describe CreateUserIssue do
      let!(:request)  { stub_maestro_request(:post, path).with(body: json) }
      let(:issue_params) { { text: "My issue", url:"http://example.com" } }
      let(:body) do
        {
          "issue": {
            "course_id": course_id,
            "course_run_id": course_run_id,
            "enrollment_id": enrollment_id,
            "text": "My issue",
            "url": "http://example.com"
          },
          "lms_data": [],
          "token": "token"}
      end
      let(:course_id) { 1 }
      let(:course_run_id) { 2 }
      let(:enrollment_id) { SecureRandom.uuid }
      let(:issue)     { {course_id: course_id, text: text} }
      let(:json)      { JSON.generate(body) }
      let(:path)      { '/v1/lms/profile/issues' }
      let(:response)  do
        described_class.
          call(session, course_id, course_run_id, enrollment_id, issue_params)
      end
      let(:session)   { double('Session', token: token) }
      let(:text)      { 'text' }
      let(:token)     { 'token' }

      before(:each) do
        allow(session).to receive(:[]).with(:lms_data).and_return([])
      end

      it_behaves_like 'an HTTP error handling service'

      it 'sends the proper HTTP request' do
        response

        expect(request).to have_been_requested
      end
    end
  end
end
