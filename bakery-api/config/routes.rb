# config/routes.rb

Rails.application.routes.draw do
  # 1. 把它挪出来，别放在 api/v1 里面
  devise_for :users, controllers: {
    registrations: 'users/registrations'
  }

  # 将路由包裹在 api/v1 命名空间下
  namespace :api do
    namespace :v1 do
      resources :breads, only: %i[index]
      resources :cart_items, only: %i[index create]
    end
  end
end
