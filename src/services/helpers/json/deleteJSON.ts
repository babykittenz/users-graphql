async function deleteJSON(url: string): Promise<void> {
  const res = await fetch(url, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to DELETE ${url}: ${res.statusText}`);
  }
}

export default deleteJSON;
