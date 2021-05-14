module Api
  class UsersController < ApplicationController
    skip_before_action :authenticate, only: :create
    skip_before_action :verify_authenticity_token, only: :create

    # POST /signup
    def create
      user = User.create(create_user_params)
      if user.valid?
        session[:user_id] = user.id
        set_csrf_token!
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # GET /me
    def show
      render json: @current_user
    end

    # PATCH /me
    def update
      @current_user.update(update_user_params)
      if @current_user.valid?
        render json: @current_user
      else
        render json: { errors: @current_user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def update_user_params
      params.permit(:username)
    end

    def create_user_params
      params.permit(:username, :password)
    end

  end
end
