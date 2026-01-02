# app/models/cart_item.rb
class CartItem < ApplicationRecord
  belongs_to :user
  belongs_to :bread
end
