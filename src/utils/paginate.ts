export function paginate<T>(
  data: T[],
  page: number,
  limit: number
) {
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: data.slice(start, end),
    total: data.length,
  };
}
