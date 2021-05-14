module Api
  class UsersController < ApplicationController

    # POST /signup
    def create
      user = User.create(create_user_params)
      if user.valid?
        # TODO: add session
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

  end
end
