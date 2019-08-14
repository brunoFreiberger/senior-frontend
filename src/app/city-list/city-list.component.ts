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
    { prop: 'capital', name: 'Capital' },
    { prop: 'lat', name: 'Latitude' },
    { prop: 'lon', name: 'Longitude' }
  ];

  constructor(private fb: FormBuilder, 
    private stateService: StateService, 
    private cityService: CityService,
    public spinner: NgxSpinnerService,
    private router: Router) {
    this.filterForm = fb.group({
      'ibgeId': [null],
      'capital': [false]
    });

    this.uploadForm = fb.group({
      'profile': ['']
    });
  }

  ngOnInit() {

    this.pageable = { total: 0, size: 5, page: 0, sort: new Sort(['name'], Direction.ASC) };

    this.rowsLimitSelect = [
      { value: 5 },
      { value: 10 },
      { value: 15 }
    ];
    this.datatableMessageConfig = {
      emptyMessage: 'Nenhum registro encontrado!',
      totalMessage: 'registro(s) encontrados.'
    }
    this.stateService.getAll().subscribe(list => {
      this.states = list;
    });
  }

  public loadPaginatedData(): void {
    this.spinner.show();
    this.cityService.getPaginatedDataFiltered(this.pageable, this.filterForm.value).subscribe(data => {
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

  public onSort(event): void {
    const evtSort: any = event.sorts[0];
    const sort: any = { properties: evtSort.prop, direction: evtSort.dir === 'asc' ? 'ASC' : 'DESC' };
    this.pageable.sort = sort;
    this.loadPaginatedData();
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.cityService.upload(formData);
    }
  }

  onSubmitForm() {

  }

  public removeCity(id: number): void {
    
  }

  public editCity(id: number): void {
    this.router.navigate(['../city-registration', { id }]);
  }

  public search(): void {
    this.loadPaginatedData();
  }

}
