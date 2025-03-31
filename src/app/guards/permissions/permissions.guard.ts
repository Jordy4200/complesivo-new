import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.getCurrentUser()) {
    // Guardar la URL a la que intentaba acceder
    authService.redirectUrl = state.url;
    router.navigate(['/login']);
    return false;
  }

  return true;
};