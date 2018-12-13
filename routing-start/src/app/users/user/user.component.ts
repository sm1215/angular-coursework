import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSubscription : Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // route.params is an Observable
    // Observables can be used for async tasks
    // A route subscribe can be useful if the current component's route changes and stays on the same component
    // It won't re-initialize so the data on the page won't change.
    this.paramsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  ngOnDestroy() {
    // This isn't necessary for a router.params subscription because Angular will unsubscribe router.params automatically
    // when this component is destroyed.

    // However, if using subscriptions for other things, it would be important to implement this because router.params is an exception
    this.paramsSubscription.unsubscribe();
  }
}
