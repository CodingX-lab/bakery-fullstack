# app/models/user.rb
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :cart_items

  # 快捷判断：可以用 if current_user.admin? 代替 if current_user.role == "admin"
  def admin?
    role == 'admin'
  end
end
