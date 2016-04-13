Rails.application.routes.draw do
  root to: -> { [200, {}, 'ok'] }
end
