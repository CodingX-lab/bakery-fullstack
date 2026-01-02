import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: { email, password, password_confirmation: password },
      }),
      credentials: "include", // 👈 告诉浏览器：记住 Rails 给我的 Cookie！
    });

    if (response.ok) {
      alert("注册成功！");
      navigate("/"); // 注册完跳回首页
      window.location.reload(); // 简单粗暴地刷新一下，让 App.jsx 重新抓取数据
    } else {
      alert("注册失败，请检查邮箱或密码");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>注册新账号</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="邮箱"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="密码"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">立即注册</button>
      </form>
    </div>
  );
}

export default Signup;
