import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Products search={search} />
    </>
  );
}
