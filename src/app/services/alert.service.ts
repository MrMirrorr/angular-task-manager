import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  showAlert(message: string, type: 'error' | 'success'): void {
    this.snackBar.open(message, 'Close', {
      panelClass: `${type}-snackbar`,
      horizontalPosition: 'end',
      duration: 3000,
    });
  }
}
