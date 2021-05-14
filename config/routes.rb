Rails.application.routes.draw do
  namespace :api do
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    patch "/me", to: "users#update"
  end

  # fallback for React Router
  get '*path', to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
