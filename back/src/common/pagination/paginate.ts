import { PaginationResult } from './paginate.results';

export class Pagination<PaginationEntity> {
  public results: PaginationEntity[];
  public take: number;
  public total: number;

  constructor(paginationResult: PaginationResult<PaginationEntity>) {
    this.results = paginationResult.results;
    this.take = paginationResult.results.length;
    this.total = paginationResult.total;
  }
}