require 'rails_helper'

RSpec.describe ApplicationController do
  controller(described_class) do
    def index
      render nothing: true
    end
  end

  let(:token) { 'token-12345' }

  before do
    session[:maestro_token] = token
  end

  context 'with valid token' do
    before do
      stub_maestro_request(:patch, '/v1/sessions')
        .with(body: {session: {token: token}}).to_return(status: 200)
    end

    it 'renders action normally' do
      get(:index)
      expect(response).to have_http_status(:ok)
    end
  end

  context 'with invalid token' do
    before do
      stub_maestro_request(:patch, '/v1/sessions')
        .with(body: {session: {token: token}}).to_return(status: 403)
    end

    it 'returns unauthorized HTTP status' do
      get(:index)
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
