# config/initializers/cors.rb

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    # 允许来自 React 开发服务器的请求
    origins 'localhost:5173'

    resource '*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             # 👈 核心配置：允许跨域携带凭证（Cookie/Session）
             credentials: true
  end
end
