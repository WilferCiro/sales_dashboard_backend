export interface DomainPaginationDto {
  page: number;
  count: number;
  sort: string;
  sortOrder: 1 | -1;
  search?: string;
}
