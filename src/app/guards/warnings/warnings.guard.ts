import { CanDeactivateFn } from '@angular/router';
import { ProductFormComponent } from '../../pages/product-form/product-form.component';

export const warningsGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const currentComponent = component as ProductFormComponent;
  
  if(currentComponent.form.touched){
    return window.confirm("Estas seguro que deseas abandonar la pagina?");
  }
  return true;
};
