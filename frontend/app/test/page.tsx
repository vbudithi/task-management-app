"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

export default function TestPage() {
  const [result, setResult] = useState("");

  useEffect(() => {
    apiClient
      .get("/task")
      .then((res) => setResult(JSON.stringify(res.data)))
      .catch((err) => setResult(err.message));
  }, []);

  return (
    <div>
      <h1>API Test</h1>
      <pre>{result}</pre>
    </div>
  );
}