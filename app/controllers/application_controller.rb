class ApplicationController < ActionController::API
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection

  protect_from_forgery with: :exception

  before_action :authenticate

  def authenticate
    @current_user ||= User.find(session[:user_id])
    # new authenticity token on each request for authenticated users
    set_csrf_token!
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Not authorized" }, status: :unauthorized
  end
  
  def set_csrf_token!
    cookies["CSRF-TOKEN"] = form_authenticity_token
  end

end
