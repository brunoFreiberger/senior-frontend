import { Component, OnInit } from '@angular/core';
import { City } from '../city-registration/city';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  public cities: Array<City> = [];
  public selectedCities: Array<City> = [];
  public pageable: any;
  public form: FormGroup;

  public datatableMessageConfig: any;

  public rowsLimitSelect: Array<any>;

  public columns: Array<any> = [
    { prop: 'ibgeId', name: 'IBGE' },
    { prop: 'uf', name: 'UF' },
    { prop: 'name', name: 'Nome' },
    { prop: 'capital', name: 'Capital' },
    { prop: 'lat', name: 'Latitude' },
    { prop: 'lon', name: 'Longitude' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      'ibgeId': [null],
      'capital': [false]
    });
   }

  ngOnInit() {
    this.pageable = { total: 0, size: 5, page: 0, sort: { properties: 'name', direction: 'ASC' } };
    this.rowsLimitSelect = [
      { value: 5 },
      { value: 10 },
      { value: 15 }
    ];
    this.datatableMessageConfig = {
      emptyMessage: 'Nenhum registro encontrado!',
      totalMessage: 'registro(s) encontrados.'
    }
  }

  public loadPaginatedData(): void {

  }

  public setPage(pageNumber: number): void {
    this.pageable.page = pageNumber;
    this.loadPaginatedData();
  }

  public onSelect({ selected }): void {
    if (selected) {
      this.selectedCities = selected;
    }
  }

  public onSort(event): void {
    const evtSort: any = event.sorts[0];
    const sort: any = { properties: evtSort.prop, direction : evtSort.dir === 'asc' ? 'ASC' : 'DESC' };
    this.pageable.sort = sort;
    this.loadPaginatedData();
  }

  public removeCity(id) {
    //TODO
  }

  public editCity() {

  }

  public search() {

  }

}
