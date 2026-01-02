# config/routes.rb

Rails.application.routes.draw do
  devise_for :users
  # 将路由包裹在 api/v1 命名空间下
  namespace :api do
    namespace :v1 do
      resources :breads, only: %i[index]
      resources :cart_items, only: %i[index create]
    end
  end
end
