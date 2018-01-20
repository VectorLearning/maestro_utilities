require 'spec_helper'

module Maestro
  module Data
    RSpec.describe GetTsCourses do
      let!(:request) { stub_maestro_request(:get, path).with(body: json) }
      let(:body)     { {start: startrow, length: limit, coursename: coursename, coursetype: coursetype, token: token} }
      let(:json)     { JSON.generate(body) }
      let(:path)     { '/v1/lms/ts_courses' }
      let(:startrow)  { 0 }
      let(:limit) { 1000 }
      let(:coursename)  { 'Test Course' }
      let(:coursetype)  { 'TS Course' }
      let(:response) { described_class.call(session, startrow, limit, coursename, coursetype) }
      let(:session)  { double('Session', token: token, user_id: user_id) }
      let(:user_id) { 1 }
      let(:token)    { 'token' }

      it_behaves_like 'an HTTP error handling service'

      it 'sends the proper HTTP request' do
        response
        expect(request).to have_been_requested
      end
    end
  end
end
