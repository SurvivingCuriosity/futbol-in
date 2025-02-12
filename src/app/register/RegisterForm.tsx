"use client";

import React from "react";

export const RegisterForm = () => {
  const handleClickRegister = async () => {
    await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      }),
    });
  }

    return (
    <div>
      <button onClick={handleClickRegister}>Register</button>
    </div>
  );
};
