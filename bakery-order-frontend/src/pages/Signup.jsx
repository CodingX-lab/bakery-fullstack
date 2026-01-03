import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function Signup() {
  // 1. 只需要 register 和 handleSubmit
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  // data 参数会自动包含 { email: "...", password: "..." }
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        // 假设这是 Rails Devise 的路径
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // 注意：Rails 通常期望数据嵌套在 user 对象里
        body: JSON.stringify({
          user: {
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
          },
        }),
        credentials: "include",
      });

      if (response.ok) {
        alert("登录成功！");
        navigate("/");
        window.location.reload();
      } else {
        alert("登录失败，请检查邮箱或密码");
      }
    } catch (error) {
      console.error("网络错误:", error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Typography variant="h5">注册</Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
        {/* 2. 关键点：直接使用 inputProps 注入 register */}
        <TextField
          label="邮箱"
          fullWidth
          margin="normal"
          // 1. 注册校验规则
          {...register("email", {
            required: "必须填写邮箱",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "格式不太对哦",
            },
          })}
          // 2. 联动显示：如果 errors 里面有 email 的错误，就把框框变红
          error={!!errors.email}
          // 3. 联动提示：把保险箱里的错误话术显示在输入框下面
          helperText={errors.email?.message}
        />

        <TextField
          label="密码"
          type="password"
          fullWidth
          margin="normal"
          {...register("password", {
            minLength: { value: 6, message: "最少6位" },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <TextField
          label="确认密码"
          type="password"
          fullWidth
          {...register("password_confirmation", {
            required: "请再次输入密码",
            validate: (value, formValues) =>
              value === formValues.password || "两次密码不一致哦", // 👈 核心逻辑
          })}
          error={!!errors.password_confirmation}
          helperText={errors.password_confirmation?.message}
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          立即提交
        </Button>
      </Box>
    </Container>
  );
}

export default Signup;
