# app/models/bread.rb
class Bread < ApplicationRecord
  belongs_to :category
  has_many :cart_items
end
