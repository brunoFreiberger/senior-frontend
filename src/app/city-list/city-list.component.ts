import { Component, OnInit } from '@angular/core';
import { City } from '../city-registration/city';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StateService } from '../core/services/state.service';
import { State } from '../core/model/state';
import { CityService } from '../core/services/city.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Direction } from '../core/model/direction';
import { Sort } from '../core/model/sort';
import { Router } from '@angular/router';
import { CityFilter } from '../core/model/city-filter';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit {

  public cities: Array<City> = [];
  public selectedCities: Array<City> = [];
  public pageable: any;
  public filterForm: FormGroup;
  public uploadForm: FormGroup;

  public datatableMessageConfig: any;

  public rowsLimitSelect: Array<any>;

  public states: Array<State> = [];

  public columns: Array<any> = [
    { prop: 'ibgeId', name: 'IBGE' },
    { prop: 'stateUf', name: 'UF' },
    { prop: 'name', name: 'Nome' },
    { prop: 'lat', name: 'Latitude' },
    { prop: 'lon', name: 'Longitude' }
  ];

  constructor(private fb: FormBuilder, 
    private stateService: StateService, 
    private cityService: CityService,
    public spinner: NgxSpinnerService,
    private router: Router) {
    
    this.filterForm = fb.group({
      'ibgeId': [''],
      'capital': [false],
      'stateId': ['']
    });

    this.uploadForm = fb.group({
      'profile': ['']
    });
  }

  ngOnInit() {

    this.pageable = { total: 0, size: 5, page: 0, sort: new Sort(['name'], Direction.ASC) };

    this.datatableMessageConfig = {
      emptyMessage: 'Nenhum registro encontrado!',
      totalMessage: 'registro(s) encontrados.'
    }
    this.stateService.getAll().subscribe(list => {
      this.states = list;
    });

    this.loadPaginatedData();
  }

  public loadPaginatedData(): void {
    this.spinner.show();
    const filter: CityFilter = this.filterForm.value;
    this.cityService.getPaginatedDataFiltered(this.pageable, filter).subscribe(data => {
        this.spinner.hide();
        if (data) {
            this.cities = data.content;
            this.pageable.total = data.totalElements;
        }
    });
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

  onSort(event) {
    const evtSort = event.sorts[0];
    const sort = new Sort([evtSort.prop], evtSort.dir === 'asc' ? Direction.ASC : Direction.DESC);
    this.pageable.sort = sort;
    this.loadPaginatedData();
}

  onFileSelect(event) {
    this.spinner.show();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.cityService.upload(formData).subscribe(res => {
        this.loadPaginatedData();
      });
    }
  }

  public resetFilter(): void {
    this.filterForm.reset();
    this.loadPaginatedData();
  }

  public removeCity(id: number): void {
    this.cityService.remove(id).subscribe(res => {
      this.loadPaginatedData();
    });
  }

  public editCity(id: number): void {
    this.router.navigate(['../city-registration', { id }]);
  }

  public search(): void {
    this.loadPaginatedData();
  }

}
