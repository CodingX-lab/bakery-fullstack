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
  }, [navigate]);

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
      const newItem = await res.json();
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  };

  return (
    <>
      <Navbar count={cartItems.length} />
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
