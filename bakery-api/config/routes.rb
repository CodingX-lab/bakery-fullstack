# config/routes.rb
Rails.application.routes.draw do
  # 给 devise 增加默认 json 格式，这样它就不会总想着跳 HTML 页面了
  devise_for :users, defaults: { format: :json }, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }

  get '/current_user_endpoint', to: 'users/auth#current_user_info'

  namespace :api, defaults: { format: :json } do # 同样给 API 增加默认格式
    namespace :v1 do
      resources :breads, only: %i[index]
      resources :cart_items, only: %i[index create update destroy]
    end
  end
end
