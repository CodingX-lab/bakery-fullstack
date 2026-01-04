import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";

function Login({ setUser, fetchCart }) {
  const navigate = useNavigate();

  // 1. 初始化 RHF
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. 提交逻辑：data 会自动包含上面所有的字段
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/users/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: {
            ...data,
          },
        }),
        credentials: "include",
      });

      // const result = await response.json();

      if (response.ok) {
        const result = await response.json();
        // 【关键】更新父组件的状态，Navbar 会因为这个状态改变而自动重新渲染
        setUser(result.data);
        await fetchCart(); // ✅ 登录成功后立即获取购物车
        alert("登录成功！");
        navigate("/");
      }
    } catch (error) {
      console.error("登录失败:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          登录账号
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          {/* Email 字段 */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "请输入邮箱",
              pattern: { value: /^\S+@\S+$/i, message: "邮箱格式不正确" },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="邮箱"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          {/* Password 字段 */}
          <Controller
            name="password"
            control={control}
            rules={{
              required: "请输入密码",
              minLength: { value: 6, message: "最少6位" },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="密码"
                type="password"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            立即登录
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
