import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl = 'http://localhost:3000/api/v1';
  private endPoint = '/locations';

  private locationsSubject = new BehaviorSubject<Location[]>([]);
  locations$ = this.locationsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): void {
    this.http
      .get<Location[]>(`${this.baseUrl}${this.endPoint}`)
      .pipe(tap((locations) => this.locationsSubject.next(locations)))
      .subscribe();
  }

  create(category: Location): Observable<Location> {
    return this.http
      .post<Location>(`${this.baseUrl}${this.endPoint}`, category)
      .pipe(
        tap((newLocation) => {
          const currentLocations = this.locationsSubject.getValue();
          this.locationsSubject.next([...currentLocations, newLocation]);
        })
      );
  }
}
