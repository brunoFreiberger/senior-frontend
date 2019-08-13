import { Component, OnInit } from '@angular/core';
import { City } from '../city-registration/city';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  public rows: Array<City>;
  public selectedRows: Array<City> = [];
  public pageable: any;

  public datatableMessageConfig: any = {
    emptyMessage: 'Nenhum registro encontrado!',
    totalMessage: 'registro(s)'
  };

  public rowsLimitSelect: Array<any> = [
    { value: 5 },
    { value: 10 },
    { value: 15 }
  ];

  public columns: Array<any> = [
    { prop: 'ibgeId', name: 'IBGE' },
    { prop: 'uf', name: 'UF' },
    { prop: 'name', name: 'Nome' },
    { prop: 'capital', name: 'Capital' },
    { prop: 'lat', name: 'Latitude' },
    { prop: 'lon', name: 'Longitude' }
  ];

  constructor() { }

  ngOnInit() {
    this.pageable = { total: 0, size: 5, page: 0, sort: { properties: 'name', direction: 'ASC' } };
  }

  public loadPaginatedData() {

  }

  public search() {
    
  }

  public setPage(pageNumber: number): void {
    this.pageable.page = pageNumber;
    this.loadPaginatedData();
  }

  public onSelect({ selected }): void {
    if (selected) {
      this.selectedRows = selected;
    }
  }

  onSort(event) {
    const evtSort = event.sorts[0];
    const sort = { evtSort.prop, evtSort.dir === 'asc' ? 'ASC' : 'DESC' };
    this.pageable.sort = sort;
    this.search(false);
  }

}
