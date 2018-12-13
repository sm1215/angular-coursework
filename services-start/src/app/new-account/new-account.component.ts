import { Component } from '@angular/core';

import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService] // Need to specify the service in the providers argument
})
export class NewAccountComponent {
  // @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  // This is a better way to gain access to a service
  // It uses injection
  // Adding a type for a service is not optional
  constructor (
    private loggingService: LoggingService,
    private accountsService: AccountsService) {
      this.accountsService.statusUpdated.subscribe(
        (status: string) => alert('New Status: ' + status)
      );
    }

  onCreateAccount(accountName: string, accountStatus: string) {
    // console.log('A server status changed, new status: ' + accountStatus);

    // This is not the best way to gain access to a service
    // const service = new LoggingService();
    // service.logStatusChange(accountStatus);

    this.accountsService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}
