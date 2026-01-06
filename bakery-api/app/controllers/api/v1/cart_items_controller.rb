class Api::V1::CartItemsController < ApplicationController
  # 重点：保护这个 API
  before_action :authenticate_user!

  def index
    # 临时展示数据库里所有的购物车项，不管是谁的
    @cart_items = current_user.cart_items.all
    render json: @cart_items.as_json(include: :bread)
  end

  def create
    # 逻辑：如果有就加数量，没有就新建
    @cart_item = current_user.cart_items.find_or_initialize_by(bread_id: params[:bread_id])

    if @cart_item.new_record?
      @cart_item.quantity = 1
    else
      @cart_item.quantity += 1
    end

    if @cart_item.save
      render json: @cart_item.as_json(include: :bread), status: :created
    else
      render json: @cart_item.errors, status: :unprocessable_entity
    end
  end

  def update
    @cart_item = current_user.cart_items.find(params[:id])

    # 接收前端传来的具体数量
    if @cart_item.update(quantity: params[:quantity])
      render json: @cart_item
    else
      render json: @cart_item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @cart_item = current_user.cart_items.find(params[:id])
    @cart_item.destroy
    head :no_content
  end
end
