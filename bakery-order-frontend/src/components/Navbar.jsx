// src/components/Navbar.jsx
import { Link } from "react-router-dom";

function Navbar({ count }) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem",
        background: "#eee",
      }}
    >
      <Link to="/">首页</Link>
      <Link to="/cart">🛒 购物车 ({count})</Link>
    </nav>
  );
}
export default Navbar;
