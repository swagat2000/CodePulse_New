import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../Models/category.model';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private router = inject(Router);



  constructor() {
    effect(() => {
      const status = this.categoryService.addCategoryStatus();
      if (status === 'success') {
        this.categoryService.addCategoryStatus.set('idle');
        //this.addCategoryForm.reset();
        
        this.router.navigate(['/admin/categories']);
      }

      if (status === 'error') {
        console.error('Add Category Request failed');
      }

    });
  }

  private categoryService = inject(CategoryService);

  addCategoryForm = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(200)]}),
  });

  get nameFormControl() {
    return this.addCategoryForm.controls.name;
  }
  
  get urlHandleFormControl() {
    return this.addCategoryForm.controls.urlHandle;
  } 
  

  onSubmit() 
  {
    const addCategoryFormValue = this.addCategoryForm.getRawValue();

    const addCategoryRequestDto : AddCategoryRequest = {
      name: addCategoryFormValue.name,
      urlHandle: addCategoryFormValue.urlHandle
    };
    this.categoryService.addCategory(addCategoryRequestDto);

    


}
}
