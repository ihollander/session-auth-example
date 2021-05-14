module Api
  class SessionsController < ApplicationController

    # POST /login
    def create
      user = User.find_by(username: params[:username])
      if user&.authenticate(params[:password])
        # TODO: add session
        render json: user
      else
        render json: { errors: ["Invalid username or password"] }, status: :unauthorized
      end
    end

  end
end
