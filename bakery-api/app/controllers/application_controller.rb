# app/controllers/application_controller.rb
class ApplicationController < ActionController::API # 回归 API
  # 手动引入 API 模式缺少的模块
  include ActionController::MimeResponds
  include ActionController::Helpers

  # 这一行，就能让你删掉路由里 80% 的 defaults: { format: :json }
  before_action :set_default_format
  # 拦截 Devise 可能会报的错误
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # 只管更新逻辑，注册逻辑已经交给 RegistrationsController 专人负责了
    devise_parameter_sanitizer.permit(:account_update, keys: %i[username address phone])
  end

  private

  def set_default_format
    request.format = :json
  end
end
