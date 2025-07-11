export type PaginationType = {
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  pageCount: number; 
  totalCount: number;
};