import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {

    // Queryparams denoted by key / value pairs with a '?' and '&' in the url
    // Fragments denoted by a single string with '#'
    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);

    // Just like regular params, if any of these values change without the page changing, you
    // need to subscribe and update data in a subscribe callback handler
    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    // Subscribe to route params to update the id if params change
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(
      this.server.id,
      {
        name: this.serverName,
        status: this.serverStatus
      }
    );

    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) &&
      !this.changesSaved) {
        return confirm('Do you want to discard the changes?');
      } else {
        return true;
      }
    }
  }

}
