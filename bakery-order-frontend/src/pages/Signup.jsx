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

function Signup({ setUser }) {
  const navigate = useNavigate();

  // 1. 初始化 RHF
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      username: "", // 明天记得在后端也同步加上这个字段
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  // 2. 提交逻辑：data 会自动包含上面所有的字段
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: {
            ...data,
            password_confirmation: data.password_confirmation, // Devise 默认需要确认字段
          },
        }),
        credentials: "include",
      });

      const result = await response.json();
      console.log("注册返回的数据:", result);

      if (response.ok) {
        // setUser(result.data); // ✅ 更新用户状态
        setUser(result); // ✅ 更新用户状态
        alert("注册成功！");
        navigate("/");
      } else {
        // 如果后端报错，result.errors 会包含类似 { email: ["has already been taken"] }
        console.error("注册失败:", result.errors);
        alert("注册失败: " + JSON.stringify(result.errors));
      }
    } catch (error) {
      console.error("网络错误:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" gutterBottom align="center">
          注册新账号
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          {/* Username 字段 */}
          <Controller
            name="username"
            control={control}
            rules={{ required: "请输入用户名" }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="用户名"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />

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

          {/* password_confirmation 字段 */}
          <Controller
            name="password_confirmation"
            control={control}
            rules={{
              required: "请再次输入密码",
              minLength: { value: 6, message: "最少6位" },
              validate: (value, formValues) =>
                value === formValues.password || "两次密码不一致哦",
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
            立即注册
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
