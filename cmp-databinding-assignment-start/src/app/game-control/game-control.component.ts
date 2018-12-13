import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  @Output() runLoop = new EventEmitter<{ loopCount: number }>();
  running = false;
  timer = null;
  count = 0;
  interval = 100;

  constructor() { }

  ngOnInit() { }

  onStart() {
    this.running = true;
    this.timer = setInterval(() => {
      this.loop();
    }, this.interval);
  }

  onStop() {
    this.running = false;
    clearInterval(this.timer);
  }

  loop() {
    if (this.running) {
      this.runLoop.emit({
        loopCount: this.count
      });
      this.count++;
    }
  }

}
