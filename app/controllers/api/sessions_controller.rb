module Api
  class SessionsController < ApplicationController
    skip_before_action :authenticate, only: :create
    skip_before_action :verify_authenticity_token, only: :create

    # POST /login
    def create
      user = User.find_by(username: params[:username])
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        set_csrf_token!
        render json: user
      else
        render json: { errors: ["Invalid username or password"] }, status: :unauthorized
      end
    end

    # DELETE /logout
    def destroy
      session.delete(:user_id)

      head :no_content
    end

  end
end
