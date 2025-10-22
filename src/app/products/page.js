"use client";

import { useEffect, useState } from "react";
import api from "@/lib/apiClient";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-2">Products</h1>
      <ul className="space-y-1">
        {products.map((p) => (
          <li key={p._id}>
            {p.name} — {p.price / 100}€
          </li>
        ))}
      </ul>
    </div>
  );
}
