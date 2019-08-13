import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-city-registration',
  templateUrl: './city-registration.component.html',
  styleUrls: ['./city-registration.component.scss']
})
export class CityRegistrationComponent implements OnInit {

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      'id': [null],
      'ibgeId': [null, Validators.required],
      'uf': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
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
  }

  public persistObject(): void {
    const city = this.form.value;
    console.log(city)
  }

}
