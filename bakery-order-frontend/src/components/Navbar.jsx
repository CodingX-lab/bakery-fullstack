// src/components/Navbar.jsx
import { Link } from "react-router-dom";
// 检查这一行，确保 Container 在大括号里
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  Box,
} from "@mui/material";
// 1. 引入刚才创建的组件
import UserSplitButton from "./UserSplitButton";

function Navbar({ count, user, setUser }) {
  // 模拟从后台拿到的用户信息
  // const currentUser = {
  //   name: "Gemini",
  //   avatarUrl: "https://example.com/p.jpg",
  // };

  return (
    // 1. position="static" 让它随页面滚动，不会遮挡内容
    // 2. color="inherit" 或 "primary" 决定背景色
    <AppBar
      position="static"
      sx={{ bgcolor: "white", color: "text.primary" }}
      elevation={1}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* LOGO 部分：flexGrow: 1 会把右边的内容“推”过去 */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          ></Typography>

          {/* 右侧导航区域 */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Link to="/">首页</Link>
            <Link to="/cart">🛒 购物车 ({count})</Link>

            {/* 3. 放入你刚才做的组件 */}
            <UserSplitButton user={user} setUser={setUser} />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
