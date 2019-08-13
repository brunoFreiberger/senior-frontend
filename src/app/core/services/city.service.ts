import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from 'src/app/city-registration/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  constructor(private http: HttpClient) { }

  public save(obj: City): Observable<any> {
    return this.http.post('api/city/save', JSON.stringify(obj), this.httpOptions);
  }

  public getById(id: number): Observable<any> {
    return this.http.get('api/city/find/' + id, this.httpOptions);
  }

  public getAll(): Observable<any> {
    return this.http.get('api/city/all', this.httpOptions);
  }

  public count(): Observable<any> {
    return this.http.get('api/city/count', this.httpOptions);
  }

  public remove(id: number): Observable<any> {
    return this.http.delete('api/city/remove/' + id, this.httpOptions);
  }

  public removeBatch(rows: Array<City>): Observable<any> {
    return this.http.post('api/city/removeBatch', JSON.stringify(rows), this.httpOptions);
  }

  public update(obj: City): Observable<any> {
    return this.http.put('api/city/save', JSON.stringify(obj), this.httpOptions);
  }
}
