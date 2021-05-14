Rails.application.routes.draw do
  namespace :api do
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    patch "/me", to: "users#update"
  end
end
