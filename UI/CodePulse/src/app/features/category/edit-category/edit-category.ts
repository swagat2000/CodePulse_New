import { Component, effect, inject, input } from "@angular/core";
import { CategoryService } from "../services/category-service";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-category",
  imports: [ReactiveFormsModule],
  templateUrl: "./edit-category.html",
  styleUrl: "./edit-category.css",
})
export class EditCategory {

  id = input<string>();

  private categoryService = inject(CategoryService);
 
  categoryResourceref = this.categoryService.getCategoryById(this.id);

  categoryResponse = this.categoryResourceref.value;

  editCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(100)]}),
    urlHandle: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.maxLength(200)]}),
  });
addCategoryForm: any;

  get nameFormControl() {
    return this.editCategoryFormGroup.controls.name;
  }
  
  get urlHandleFormControl() {
    return this.editCategoryFormGroup.controls.urlHandle;
  } 

  effectRef = effect(() => {
    this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name?? '' );
    this.editCategoryFormGroup.controls.urlHandle.patchValue(this.categoryResponse()?.urlHandle?? '' );
  })
 
  onSubmit()
  {
    console.log(this.editCategoryFormGroup.getRawValue());
  }
  
  
}
