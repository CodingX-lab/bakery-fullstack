import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Styles from "./Home.module.scss";

function Home({ onAddToCart }) {
  // 1. 初始化数据为空数组
  const [breadList, setBreadList] = useState([]);
  // 2. 增加一个“加载中”的状态
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 3. 模拟从服务器（API）获取数据
    console.log("组件挂载了，准备去拿数据...");
    document.title = "欢迎光临面包店";

    setTimeout(() => {
      fetch("http://localhost:3000/api/v1/breads") // 指向你的 Rails 地址
        .then((res) => res.json())
        .then((data) => {
          setBreadList(data);
          setIsLoading(false);
        });

      setIsLoading(false); // 关掉加载动画
    }, 1000);
  }, []); // 👈 注意这个空数组 []，它表示“只在页面第一次加载时执行一次”

  return (
    <div style={{ padding: "20px" }}>
      <h2>🍞 今日新鲜出炉</h2>

      {isLoading ? (
        <p>正在从面包房搬运中...</p>
      ) : (
        <div className={Styles.container}>
          {breadList.map((bread) => (
            <ProductCard key={bread.id} product={bread} onAdd={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
