// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  const navigate = useNavigate(); // ✅ 现在这里生效了，因为父级 main.jsx 有 Router
  const [cartItems, setCartItems] = useState([]);

  // 增加一个简单的触发器，用来手动通知 useEffect 刷新数据
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      console.log("正在尝试获取购物车数据...");
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/cart_items",
          {
            credentials: "include",
          }
        );

        console.log("收到响应状态码:", response.status);

        if (response.status === 401) {
          if (window.location.pathname === "/cart") {
            console.log("检测到未登录且在购物车页，执行 navigate");
            navigate("/login");
          }
          return;
        }

        if (response.ok) {
          const data = await response.json();
          setCartItems(data);
        }
      } catch (error) {
        console.error("Fetch 发生错误:", error);
      }
    };
    fetchCart();
  }, [navigate, tick]);

  const addToCart = async (product) => {
    const res = await fetch("http://localhost:3000/api/v1/cart_items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bread_id: product.id }),
      credentials: "include",
    });

    if (res.status === 401) {
      alert("请先登录再加入购物车！");
      navigate("/login");
      return;
    }

    if (res.ok) {
      // ✅ 重点：这里不直接调函数，而是改变 tick 的值
      // 这一变，上面的 useEffect 就会感知到，并自动运行内部的 fetchCart
      setTick((prev) => prev + 1);
      alert("添加成功！");
    }
  };

  // 计算购物车中所有面包的总件数 (9个牛角包 + 1个吐司 = 10件)
  const totalItemsCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <>
      <Navbar count={totalItemsCount} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/cart" element={<Cart items={cartItems} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
