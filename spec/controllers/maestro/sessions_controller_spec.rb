require 'rails_helper'

module Maestro
  RSpec.describe SessionsController do
    routes { Maestro::Engine.routes }

    describe '#create' do
      let(:create_params) { params.merge(signature: signature) }
      let(:params) { {expires: 2.minutes.from_now.to_i, token: token } }
      let(:signature) { Signature.new(params).signature }
      let(:token) { 'token-12345' }

      before do
        get(:create, create_params)
      end

      context 'given valid parameters' do
        it 'executes configured block' do
          expect { |b|
            configure_maestro { |config|
              config.after_session_create = -> { b.to_proc.call; head :ok }
            }
            get(:create, create_params)
          }.to yield_control
        end

        it 'defaults to return HTTP 200 response' do
          expect(response).to have_http_status(:ok)
        end

        it 'sets the token in the session' do
          expect(session[:maestro_token]).to eq(token)
        end
      end

      context 'given invalid parameters' do
        let(:signature) { 'invalid' }

        it 'executes configured block' do
          expect { |b|
            configure_maestro { |config|
              config.after_invalid_signature = -> { b.to_proc.call; head :ok }
            }
            get(:create, create_params)
          }.to yield_control
        end

        it 'defaults to return HTTP 401 response' do
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    describe '#destroy' do
      let(:token) { 'token-1234' }

      before do
        session[:maestro_token] = token
      end

      context 'with valid maestro session' do
        let!(:delete_request) { stub_maestro_request(:delete, '/v1/sessions')
          .with(body: {session: {token: token}}) }
        let(:return_url) { 'http://lms.maestro.url/' }

        before do
          stub_maestro_request(:patch, '/v1/sessions')
            .with(body: {session: {token: token}})
            .to_return(body: %'{"return_url":"#{return_url}","token":"#{token}"}', status: 200)
          delete(:destroy)
        end

        it 'redirects to return_url' do
          expect(response).to redirect_to(return_url)
        end

        it 'removes the token from the session' do
          expect(session[:maestro_token]).to be_nil
        end

        it 'sends DELETE request to Maestro' do
          expect(delete_request).to have_been_requested
        end
      end

      context 'with invalid maestro session' do
        before do
          stub_maestro_request(:patch, '/v1/sessions')
            .with(body: {session: {token: token}})
            .to_return(status: 403)
        end

        it 'executes configured block' do
          expect { |b|
            configure_maestro { |config|
              config.after_invalid_session = -> { b.to_proc.call; head :ok }
            }
            delete(:destroy)
          }.to yield_control
        end

        it 'defaults to return HTTP 401 response' do
          delete(:destroy)
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end
  end
end
