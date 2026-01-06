// import React, { useState } from "react"; // 1. 引入 Hook
// import styles from "./CartItem.module.scss";
import { Container, Box, Checkbox, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"; // 👈 手动引入 minus 图标

function CartItem({ cartItem, onAdd, onUpdate, onDelete }) {
  const label = { slotProps: { input: { "aria-label": "Checkbox demo" } } };

  const handleAdd = (product) => {
    onAdd(product); // 调用父组件的总数增加
  };

  const handleUpdate = (cartItemId, itemQuantity) => {
    itemQuantity > 0
      ? onUpdate(cartItemId, itemQuantity)
      : onDelete(cartItemId);
  };

  return (
    <Container sx={{ display: "flex" }}>
      <Checkbox {...label} />
      <Box
        component="img" // 👈 告诉 Box 渲染成 <img> 标签
        src={cartItem.bread.img}
        alt={cartItem.bread.name}
        sx={{
          width: "100%", // 👈 注意：值要加引号
          height: "160px",
          objectFit: "cover", // 👈 驼峰命名法，没有横杠
          borderRadius: "8px",
          display: "block",
        }}
      />
      <FontAwesomeIcon
        icon={faMinus}
        onClick={() => handleUpdate(cartItem.id, cartItem.quantity - 1)}
      />
      <span>{cartItem.quantity}</span>
      <FontAwesomeIcon
        icon={faPlus}
        onClick={() => handleAdd(cartItem.bread)}
      />
    </Container>
  );
}
export default CartItem;
