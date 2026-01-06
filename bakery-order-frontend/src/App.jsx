// src/App.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  const navigate = useNavigate(); // ✅ 现在这里生效了，因为父级 main.jsx 有 Router
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // 用 useCallback 包裹 fetchCart
  const fetchCart = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/cart_items", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      }
    } catch (error) {
      console.error("获取失败", error);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3000/current_user_endpoint", {
        // 你后端获取当前用户的接口
        credentials: "include",
      });
      if (res.ok) {
        const result = await res.json();
        setCurrentUser(result.data); // 设置全局用户
      }
    } catch (error) {
      setCurrentUser(null);
      console.error("获取失败", error);
    }
  };

  // 专门给“初始化”用的 Effect
  useEffect(() => {
    // 把 fetchCart 定义在里面，这样它就不再是外部依赖了
    const fetchInitialData = async () => {
      fetchUser();
      fetchCart();
    };

    fetchInitialData();
    // 此时数组留空 [] 是完全合法的，因为里面没用到任何外部变量（除了被 useCallback 锁定的 fetchCart）
  }, [fetchCart]);

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
      // ✅ 重点：直接调用它！不需要 tick，不需要二次渲染
      await fetchCart();
      alert("添加成功！");
    }
  };

  // 通用更新 (加减数量、改备注等)
  const updateQuantity = async (cartItemId, newQuantity) => {
    const res = await fetch(
      `http://localhost:3000/api/v1/cart_items/${cartItemId}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }), // 注意嵌套格式
        credentials: "include",
      }
    );
    if (res.ok) await fetchCart();
  };

  // 删除商品
  const deleteCartItem = async (cartItemId) => {
    const res = await fetch(
      `http://localhost:3000/api/v1/cart_items/${cartItemId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.ok) await fetchCart();
  };

  // 计算购物车中所有面包的总件数 (9个牛角包 + 1个吐司 = 10件)
  const totalItemsCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <>
      {/* 1. 把 user 传给 Navbar */}
      <Navbar
        count={totalItemsCount}
        user={currentUser}
        setUser={setCurrentUser}
      />
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              items={cartItems}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
              onDeleteCartItem={deleteCartItem}
            />
          }
        />
        {/* 2. 把 setUser 传给登录页面，登录成功后调用它 */}
        <Route
          path="/login"
          element={<Login setUser={setCurrentUser} fetchCart={fetchCart} />}
        />
        <Route path="/signup" element={<Signup setUser={setCurrentUser} />} />
      </Routes>
    </>
  );
}

export default App;
