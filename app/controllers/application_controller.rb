class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authenticate

  def authenticate
    @current_user ||= User.find(session[:user_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Not authorized" }, status: :unauthorized
  end
  
end
