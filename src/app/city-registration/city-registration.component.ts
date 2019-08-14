import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { City } from './city';
import { NgxSpinnerService } from 'ngx-spinner';
import { CityService } from '../core/services/city.service';
import { Observable } from 'rxjs/internal/Observable';
import { StateService } from '../core/services/state.service';
import { State } from '../core/model/state';

@Component({
  selector: 'app-city-registration',
  templateUrl: './city-registration.component.html',
  styleUrls: ['./city-registration.component.scss']
})
export class CityRegistrationComponent implements OnInit {

  public form: FormGroup;
  public city: City = {} as City;
  public states: Array<State> = [];

  constructor(private fb: FormBuilder, 
              public router: Router, 
              public route: ActivatedRoute, 
              public spinner: NgxSpinnerService, 
              private service: CityService,
              private stateService: StateService) {
    this.form = fb.group({
      'id': [null],
      'ibgeId': [null, Validators.required],
      'stateUf': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
      'name': [null, Validators.required],
      'capital': [null],
      'lat': [null, Validators.required],
      'lon': [null, Validators.required],
      'noAccents': [null],
      'alternativeName': [null],
      'microregion': [null],
      'mesoregion': [null],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id: number = params['id'];
      if (id) {
        this.spinner.show();
        this.service.getById(id).subscribe(obj => {
          this.city = obj;
          this.form.setValue(this.city);
          this.spinner.hide();
        });
      }
    });

    this.stateService.getAll().subscribe(list => {
      this.states = list;
    });

  }

  public persistObject() {
    this.spinner.show();
    this.persist().subscribe(() => {
      this.spinner.hide();
      console.log('Salvo com sucesso!');
      this.back();
    });
  }

  public persist(): Observable<any> {
    this.city = this.form.value;
    return this.service.save(this.city);
}

  public back() {
    this.router.navigate(['../city-list']);
  }

  public clear() {
    this.form.reset();
  }

}
