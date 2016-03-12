Rails.application.routes.draw do
  mount Maestro::Engine => "/"
  root to: -> { [200, {}, 'ok'] }
end
