import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
 


  constructor(private cartService: CartService, private authService: AuthService) { }

  openCart() {
    this.cartService.showCart();
  }

  getCurrentUser(){
    return this.authService.getCurrentUser();
  }

  logout(){
    this.authService.logout()
      .then(() => console.log("Logout exitoso"))
      .catch(err => console.log(err));
  }

  
}
