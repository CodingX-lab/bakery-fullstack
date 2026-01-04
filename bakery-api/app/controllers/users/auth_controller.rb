# app/controllers/users/auth_controller.rb
class Users::AuthController < ApplicationController
  def current_user_info
    if user_signed_in?
      render json: { data: current_user }
    else
      render json: { data: nil }
    end
  end
end
