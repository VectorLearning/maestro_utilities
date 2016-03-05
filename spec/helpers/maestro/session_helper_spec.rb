require 'rails_helper'

module Maestro
  RSpec.describe SessionHelper do
    describe '#maestro_session' do
      let(:token) { 'token-12345' }

      before do
        helper.session[:maestro_token] = token
      end

      context 'with valid maestro session' do
        let(:return_url) { 'http://lms.maestro.url/' }

        before do
          stub_maestro_request(:patch, '/v1/sessions')
            .with(body: {session: {token: token}})
            .to_return(body: %'{"return_url":"#{return_url}"}', status: 200)
        end

        it 'returns Maestro::Session instance' do
          expect(helper.maestro_session).to be_kind_of(Maestro::Session)
        end

        it 'returns valid session' do
          expect(helper.maestro_session).to be_valid
        end

        it 'includes return_url' do
          expect(helper.maestro_session.return_url).to eq return_url
        end
      end

      context 'with invalid maestro session' do
        before do
          stub_maestro_request(:patch, '/v1/sessions')
            .with(body: {session: {token: token}}).to_return(status: 403)
        end

        it 'returns Maestro::Session instance' do
          expect(helper.maestro_session).to be_kind_of(Maestro::InvalidSession)
        end

        it 'returns invalid session' do
          expect(helper.maestro_session).to_not be_valid
        end

        it 'does not include return_url' do
          expect(helper.maestro_session.return_url).to be_nil
        end
      end
    end
  end
end
