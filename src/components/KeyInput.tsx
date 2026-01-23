"use client";

import { useState } from "react";

export const KeyInput: React.FC = () => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    localStorage.setItem("debrid-key", value);
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="outline-solid"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
};