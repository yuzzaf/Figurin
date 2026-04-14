"use server";

export async function getProducts(
  page: number = 1, 
  limit: number = 10,
  search?: string,
  filter?: string,
  sortType?: string
) {
  const url = new URL(`http://localhost:3000/api/products`);
  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", limit.toString());
  if (search) url.searchParams.append("search", search);
  if (filter) url.searchParams.append("filter", filter);
  if (sortType) url.searchParams.append("sortType", sortType);

  const resp = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await resp.json();
  return {
    ...data,
    page,
    limit,
  };
}
