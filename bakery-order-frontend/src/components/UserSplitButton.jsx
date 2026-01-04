import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Box,
  Typography,
  Divider,
} from "@mui/material";

const UserSplitButton = ({ user, setUser }) => {
  // 依然使用 state 来控制菜单的锚点
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // 点击头像时记录位置并打开
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/sign_out", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        // 登出成功后的处理
        alert("已安全退出");
        // 通常我们会跳转到首页并刷新，以清除内存中的用户信息
        window.location.href = "/";
      }
    } catch (error) {
      console.error("登出失败:", error);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
      {/* Tooltip 是可选的，鼠标悬停时显示提示 */}
      <Tooltip title="账号设置">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {/* 这里就是你要的：头像本身就是按钮内容 */}
          <Avatar
            src={user?.avatarUrl}
            sx={{ width: 32, height: 32, border: "2px solid #eee" }}
          >
            {/* 如果没有图片，就显示名字首字母 */}
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose} // 点击菜单项后自动关闭
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        // MUI 特有的纸张样式处理，可以让菜单带个小箭头
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        {user ? (
          // ------- 情况 A: 用户已登录 -------
          <Box>
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2">
                {user?.username || "已登录用户"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleClose}>个人中心 (Profile)</MenuItem>
            <MenuItem onClick={handleClose}>我的订单 (My Order)</MenuItem>
            <MenuItem onClick={handleSignout} sx={{ color: "error.main" }}>
              退出登录 (Sign out)
            </MenuItem>
          </Box>
        ) : (
          // ------- 情况 B: 用户未登录 -------
          <Box>
            <MenuItem
              onClick={() => {
                handleClose();
                window.location.href = "/login";
              }}
            >
              去登录 (Sign in)
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                window.location.href = "/signup";
              }}
            >
              注册账号 (Sign up)
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  );
};

export default UserSplitButton;
