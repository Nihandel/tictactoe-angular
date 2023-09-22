import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export enum TTTButtonState {
  X = "X", O = "O",
}
export enum TTTMatchResult {
  WinX="Winner: X",
  WinO="Winner: O",
  Draw="Draw",
}
@Injectable({
  providedIn: 'root'
})
export class MatchService {
  public get $table(): Observable<Array<TTTButtonState | undefined | null>> {
    return this._stream.asObservable();
  }
  public get matchStatus$(): Observable<TTTMatchResult | undefined> {
    return this._matchStatus.asObservable();
  }
  constructor() {
    this.clearTable();
  }
  makeMove(index: number, player: TTTButtonState) {
    var temp = this.table;
    temp[index] = player;
    this.table = temp;
    const result = this.checkWinner();
    if (!!result) {
      // winner
      this._matchStatus.next(result == TTTButtonState.X ? TTTMatchResult.WinX : TTTMatchResult.WinO);
    } else if (--this._moveLeft <= 0) {
      // draw
      this._matchStatus.next(TTTMatchResult.Draw);
    }
  }
  clearTable() {
    this.table = new Array<TTTButtonState | undefined | null>(9).fill(null);
    this._moveLeft = 9;
  }

  checkWinner(): TTTButtonState | undefined | null {
    const victoryConditions: Array<Array<number>> = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < victoryConditions.length; i++) {
      let condition = victoryConditions[i];
      let a = this._table[condition[0]];
      let b = this._table[condition[1]];
      let c = this._table[condition[2]];
      if (!!a && a == b && b == c) {
        return a;
      }
    }
    return null;
  }
  private set table(value: Array<TTTButtonState | undefined | null>) {
    this._table = value;
    this._stream.next(this.table);
  }
  private get table(): Array<TTTButtonState | undefined | null> {
    return [...this._table];
  }
  private _moveLeft!: number;
  private _stream: BehaviorSubject<Array<TTTButtonState | undefined | null>> = new BehaviorSubject<Array<TTTButtonState | undefined | null>>([]);
  private _matchStatus: BehaviorSubject<TTTMatchResult | undefined> = new BehaviorSubject<TTTMatchResult | undefined>(undefined);
  private _table!: Array<TTTButtonState | undefined | null>;
}
