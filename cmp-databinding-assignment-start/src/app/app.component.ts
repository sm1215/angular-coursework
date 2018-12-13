import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  gamePieces = [];

  onRunLoop({ loopCount }) {
    const gamePiece = { id: this.gamePieces.length, count: loopCount, isOdd: null };
    loopCount % 2 > 0 ? gamePiece.isOdd = true : gamePiece.isOdd = false;
    this.gamePieces.push(gamePiece);
  }
}
