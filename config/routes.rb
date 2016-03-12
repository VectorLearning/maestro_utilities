Maestro::Engine.routes.draw do
  get 'sessions', to: 'sessions#create', as: 'sign_in'
  delete 'sessions', to: 'sessions#destroy', as: 'sign_out'
end
