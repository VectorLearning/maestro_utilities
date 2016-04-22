require 'rails_helper'

RSpec.describe ApplicationController do
  controller(described_class) do
    def index
      render nothing: true
    end
  end

  context 'launching application' do
    let(:params) { {expires: 2.minutes.from_now.to_i, token: token} }
    let(:signature) { Maestro::Signature.new(params).signature }
    let(:signed_params) { params.merge(signature: signature) }
    let(:token) { 'token-12345' }

    before do
      stub_maestro_request(:patch, '/v1/sessions')
        .with(body: {session: {token: token}}).to_return(status: 200)
    end

    def index_request
      get(:index, signed_params)
    end

    context 'with valid parameters' do
      it 'sets token in session' do
        expect { index_request }.to change { session[:maestro_token] }
      end

      it 'renders action' do
        index_request
        expect(response).to have_http_status(:ok)
      end
    end

    context 'with invalid parameters' do
      let(:signature) { 'invalid' }

      it 'executes configured block' do
        expect { |b|
          configure_maestro { |config|
            config.after_invalid_signature = -> { b.to_proc.call; head :ok }
          }
          index_request
        }.to yield_control
      end
    end

    context 'with no launch parameters' do
      controller(described_class) do
        skip_before_filter :authenticate
        skip_before_filter :redirect_to_lms_on_session_expiration

        def index
          render nothing: true
        end
      end

      it 'does not set token in session' do
        expect { get(:index) }.to_not change { session[:maestro_token] }
      end

      it 'renders action' do
        get(:index)
        expect(response).to have_http_status(:ok)
      end
    end
  end

  context 'with token set' do
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

    context 'with expired session' do
      let(:host) { 'http://redirect.url/' }

      before do
        body = JSON.generate(lms_data: {lms_host: host})
        stub_maestro_request(:patch, '/v1/sessions')
          .with(body: {session: {token: token}})
          .to_return(body: body, status: 403)
      end

      it 'redirects to LMS' do
        get(:index)
        expect(response).to redirect_to(host)
      end
    end
  end
end
