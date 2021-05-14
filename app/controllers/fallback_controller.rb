# must inherit from ActionController::Base, otherwise render file: won't work
class FallbackController < ActionController::Base

  def index
    # React app index page
    render file: 'public/index.html'
  end
end
