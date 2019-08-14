import { Sort } from './sort';

export class Pageable {
    page: number;
    size: number;
    total: number;
    sort: Sort;
}
