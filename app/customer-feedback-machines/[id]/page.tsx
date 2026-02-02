"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams(); // <- built-in hook
  const id = params?.id;      // safely get the id

  useEffect(() => {
    console.log("ID in browser:", id);
  }, [id]);

  return <div>ID: {id}</div>;
}
