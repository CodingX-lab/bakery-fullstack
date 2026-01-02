// src/pages/Cart.jsx
function Cart({ items }) {
  return (
    <div>
      <h2>你的购物车</h2>
      {items.length === 0 ? (
        <p>空空如也</p>
      ) : (
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.bread.name} - {item.bread.price}元
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default Cart;
