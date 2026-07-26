import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category } from '../Models/category.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  private apiBaseUrl = environment.apiBaseUrl;

  addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  addCategory(category: AddCategoryRequest)
  {
    this.addCategoryStatus.set('loading');
    this.http.post<void>(`${this.apiBaseUrl}/api/Categories`, category).subscribe(
      {
        next: () => {
          this.addCategoryStatus.set('success');
        },

        error: (error) => {
          this.addCategoryStatus.set('error');
          console.error(error);
        },
      }
    );
  }

  getAllCategories()
  {
    return httpResource<Category[]>(() => `${this.apiBaseUrl}/api/Categories`)

    
  
  }

  getCategoryById(id:InputSignal<string| undefined> )
  {
    return httpResource<Category>(() => `${this.apiBaseUrl}/api/Categories/${id()}`)

  }

}

