// src/components/ProductCard.jsx
import React, { useState } from "react"; // 1. 引入 Hook
import styles from "./ProductCard.module.scss";

// 习惯上，组件函数名首字母要大写
function ProductCard({ product, onAdd }) {
  // 定义状态：likes 是数值，setLikes 是修改它的函数
  const [likes, setLikes] = useState(0);
  // 新增一个状态：是否正在“显示成功”
  const [isAdded, setIsAdded] = useState(false);

  // 定义点击后的动作
  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleAdd = (product) => {
    onAdd(product); // 调用父组件的总数增加
    // 2. 这里的骚操作：先变状态，2秒后再变回来
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={product.img} className={styles.productImage} alt={name} />
        {/* 4. 绑定点击事件 */}
        <button className={styles.likeBtn} onClick={handleLike}>
          ❤️ {likes}
        </button>
      </div>
      <div className={styles.info}>
        <h3>{product.name}</h3>
        {/* <div className={styles.actionRow}> */}
        <p className={styles.price}>价格: ¥{product.price}</p>

        {/* 加入购物车：调用从爸爸那传来的“改大账本”的权限 */}
        <button
          className={styles.addBtn}
          onClick={() => handleAdd(product)}
          disabled={isAdded} // 变成“已加入”时禁用按钮，防止狂点
        >
          {isAdded ? "✅ 已加入" : "加入购物车"}
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}

export default ProductCard;
