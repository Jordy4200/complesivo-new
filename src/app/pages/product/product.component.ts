import { Component } from '@angular/core';
import { Product } from '../../types/products';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,NgFor,NgIf],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product: Product | undefined;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService) {}

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.productsService.getProduct(id).subscribe(product => {
        this.product = product;
      });
    })
  }
}
