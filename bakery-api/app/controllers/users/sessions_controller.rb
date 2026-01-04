class Users::SessionsController < Devise::SessionsController
  # respond_to :json

  # 重写 create 方法，确保它返回 JSON 而不是尝试跳转页面
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)

    yield resource if block_given?

    # 这里是关键：返回 JSON 数据
    render json: {
      status: { code: 200, message: 'Logged in successfully.' },
      data: resource
    }, status: :ok
  end

  private

  # 登录失败时的处理（可选）
  def respond_to_on_destroy
    head :no_content
  end
end
