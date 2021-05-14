module Api
  class UsersController < ApplicationController
    skip_before_action :authenticate, only: :create

    # POST /signup
    def create
      user = User.create(create_user_params)
      if user.valid?
        session[:user_id] = user.id
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # GET /me
    def show
      render json: @current_user
    end

    private

    def create_user_params
      params.permit(:username, :password)
    end

  end
end
