class ApplicationController < ActionController::API
  before_action :configure_permitted_parameters, if: :devise_controller?
  # --- 第一部分：昨天的“基础设施” (必须有，否则 Devise 找不到 Session) ---

  # 1. 让 API 模式支持 Cookie
  include ActionController::Cookies

  # 2. 确保 Devise 能够访问到 session 对象
  def session
    super
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[username address phone])
  end
  # --- 第二部分：今天的“保安逻辑” (必须有，否则 React 会遇到死循环) ---

  private

  # 覆盖 Devise 默认的跳转行为
  def authenticate_user!
    if user_signed_in?
      # 如果登录了，就继续执行 Devise 原有的逻辑
      super
    else
      # 如果没登录，不要跳页面，直接给 React 返回 401 状态码
      render json: { error: '你必须先登录才能访问' }, status: :unauthorized
    end
  end
end
