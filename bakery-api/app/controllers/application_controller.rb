# app/controllers/application_controller.rb
class ApplicationController < ActionController::API # 回归 API
  # 手动引入 API 模式缺少的模块
  include ActionController::MimeResponds
  include ActionController::Helpers

  # 拦截 Devise 可能会报的错误
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[username address phone])
  end
end
