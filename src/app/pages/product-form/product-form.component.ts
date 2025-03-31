import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  form: FormGroup;
  id: number = 0;
  platforms = ['PS5', 'Xbox', 'PC', 'Nintendo Switch'];

  constructor(
    private productsService: ProductsService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      title: ["", [Validators.required]],
      description: [""],
      price: [0, [Validators.required]],
      image: [""],
      platform: ["", [Validators.required]],
      releaseYear: [new Date().getFullYear(), [Validators.required]],
      rating: this.formBuilder.group({
        rate: [0],
        count: [0]
      })
    });
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if(!this.id) return;
      this.productsService.getProduct(this.id).subscribe(product => {
        this.form.patchValue(product);
      });
    });
  }  

  addProduct(){
    if(this.form.invalid) return;
    this.productsService.addProduct(this.form.value)
      .then(() => this.router.navigate(["/products"]))
      .catch(err => console.log(err));
  }

  updateProduct(){
    if(this.form.invalid) return;
    this.productsService.updateProduct({ id: this.id, ...this.form.value})
      .then(() => this.router.navigate(["/products"]))
      .catch(err => console.log(err));
  }
}