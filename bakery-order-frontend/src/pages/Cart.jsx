// src/pages/Cart.jsx
import CartItem from "../components/CartItem";

function Cart({ items, onAddToCart, onUpdateQuantity, onDeleteCartItem }) {
  return (
    <div>
      <h2>你的购物车</h2>
      {items.length === 0 ? (
        <p>空空如也</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <CartItem
              key={index}
              cartItem={item}
              onAdd={onAddToCart}
              onUpdate={onUpdateQuantity}
              onDelete={onDeleteCartItem}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
export default Cart;
