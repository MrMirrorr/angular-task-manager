import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAction } from 'app/components/common';

@Injectable({
  providedIn: 'root',
})
export class MenuStateService {
  public menu$ = new BehaviorSubject<IAction[]>([]);
}
