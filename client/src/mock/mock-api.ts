export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const simulateApiCall = async <T>(
  data: T[],
  params: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    search?: string;
    searchKeys?: (keyof T)[];
  }
): Promise<PaginatedResponse<T>> => {
  const { page = 1, limit = 10, sort, order = 'asc', search, searchKeys } = params;

  await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network latency

  let filteredData = [...data];

  // Search
  if (search && searchKeys && searchKeys.length > 0) {
    const searchLower = search.toLowerCase();
    filteredData = filteredData.filter((item) =>
      searchKeys.some((key) => {
        const value = item[key];
        return String(value).toLowerCase().includes(searchLower);
      })
    );
  }

  // Sort
  if (sort) {
    filteredData.sort((a, b) => {
      const aValue = a[sort as keyof T];
      const bValue = b[sort as keyof T];

      if (aValue < bValue) return order === 'asc' ? -1 : 1;
      if (aValue > bValue) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Paginate
  const total = filteredData.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(total / limit);

  return {
    success: true,
    message: 'Success',
    data: paginatedData,
    meta: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

export const simulateSingleApiCall = async <T>(data: T) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: true,
    message: 'Success',
    data,
  };
};
