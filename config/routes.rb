Rails.application.routes.draw do
  namespace :api do
    post "/login", to: "sessions#create"
  
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
  end
end
