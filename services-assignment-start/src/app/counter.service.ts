import { Injectable } from '@angular/core';
import { UsersService } from './users.service';

@Injectable()
export class CounterService {
  setToInactiveCount = 0;
  setToActiveCount = 0;

  constructor(private usersService: UsersService) {
    this.usersService.usersUpdated.subscribe((type: string) => {
      type === 'inactive' ? this.setToInactiveCount++ : this.setToActiveCount++;
      console.log('User Status changed!');
      console.log('Active->Inactive count: ' + this.setToInactiveCount);
      console.log('Inactive->Active count: ' + this.setToActiveCount);
    });
  }
}

// Also add a CounterService which counts the number of
// active->inactive and inactive->active actions.
