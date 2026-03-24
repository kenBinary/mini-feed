export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  metadata: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
}
