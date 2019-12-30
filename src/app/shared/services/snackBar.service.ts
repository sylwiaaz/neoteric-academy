import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  private snackBar;
  constructor(private injector: Injector) {
    this.snackBar = this.injector.get(MatSnackBar);
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['error-snackbar']
    });
  }
}
