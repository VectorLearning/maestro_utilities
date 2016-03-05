require 'rails_helper'

RSpec.describe 'routing to sessions' do
  routes { Maestro::Engine.routes }

  it 'routes /sessions to maestro/sessions#create' do
    expect(get: '/sessions').to route_to(
      controller: 'maestro/sessions',
      action: 'create'
    )
  end
end
