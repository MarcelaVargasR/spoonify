export function getPagination(query: any) {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.max(1, parseInt(query.limit) || 10);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function getPaginationInfo(total: number, page: number, limit: number) {
  const pageCount = Math.ceil(total / limit);
  const nextPage = page < pageCount ? page + 1 : null;
  const previousPage = page > 1 ? page - 1 : null;

  return { currentPage: page, nextPage, previousPage, pageCount, total };
}

