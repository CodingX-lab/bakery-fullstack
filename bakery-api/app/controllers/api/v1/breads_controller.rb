# app/controllers/api/v1/breads_controller.rb

class Api::V1::BreadsController < ApplicationController
  def index
    # 试试只按价格排序
    @breads = Bread.order(price: :asc)
    render json: @breads
  end
end
