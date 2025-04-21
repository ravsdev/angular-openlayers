import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/api/v1';
  private endPoint = '/categories';

  private categoriesSubject = new BehaviorSubject<Category[] | null>(null);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAll(): void {
    if (this.categoriesSubject === null) {
      this.http
        .get<Category[]>(`${this.baseUrl}${this.endPoint}`)
        .pipe(tap((categories) => this.categoriesSubject.next(categories)))
        .subscribe();
    }
  }

  create(category: Category): Observable<Category> {
    return this.http
      .post<Category>(`${this.baseUrl}${this.endPoint}`, category)
      .pipe(
        tap((newCategory) => {
          const currentCategories = this.categoriesSubject.getValue();
          if (currentCategories !== null)
            this.categoriesSubject.next([...currentCategories, newCategory]);
        })
      );
  }

  update(id: number, category: Category): Observable<any> {
    return this.http
      .patch(`${this.baseUrl}${this.endPoint}/${id}`, category)
      .pipe(
        tap((updatedCategory) => {
          const currentCategories = this.categoriesSubject.getValue();
          if (currentCategories !== null) {
            const updatedCategories: Category[] = currentCategories.map(
              (category) => (category.id === id ? updatedCategory : category)
            ) as Category[];
            this.categoriesSubject.next(updatedCategories);
          }
        })
      );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.endPoint}/${id}`).pipe(
      tap((newCategory) => {
        const currentCategories = this.categoriesSubject.getValue();
        if (currentCategories !== null)
          this.categoriesSubject.next(
            currentCategories.filter((c) => c.id !== id)
          );
      })
    );
  }
}
