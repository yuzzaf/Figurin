"use server";

export async function getProducts(page: number = 1, limit: number = 10) {
  const resp = await fetch(
    `http://localhost:3000/api/products?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const data = await resp.json();
  return {
    ...data,
    page,
    limit,
  };
}
