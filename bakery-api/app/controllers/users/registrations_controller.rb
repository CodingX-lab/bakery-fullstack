# app/controllers/users/registrations_controller.rb
class Users::RegistrationsController < Devise::RegistrationsController
  # 1. 覆盖 Devise 内部获取注册参数的方法
  def sign_up_params
    # 这一步强制从 {"user": { ... }} 中提取字段
    params.require(:user).permit(:email, :password, :password_confirmation, :username, :address, :phone)
  end

  # 2. 覆盖响应逻辑
  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: resource, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
