// src/App.jsx
import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import styles from "./App.module.scss";
import { breadList } from "./data/inventory";

function App() {
  const [totalItems, setTotalItems] = useState(0); // 1. 总数状态（记账本）

  // 2. 修改总数的动作（这支笔，爸爸自己握着，但准备借给儿子用）
  const handleAddToCart = () => {
    setTotalItems(totalItems + 1);
  };

  return (
    <div className="App">
      <nav>
        <h1>🥖 Rachel's Bakery </h1>
        <div>🛒 购物车: {totalItems}</div>
      </nav>
      {/* 像玩积木一样使用组件，并通过 Props 传值 */}
      <div className={styles.container}>
        {breadList.map((bread) => (
          <ProductCard
            key={bread.id}
            name={bread.name}
            price={bread.price}
            img={bread.img}
            // 3. 把这支“笔”通过 props 传给子组件
            onAdd={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
