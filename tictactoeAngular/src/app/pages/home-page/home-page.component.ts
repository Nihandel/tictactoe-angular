import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { Observable, tap } from 'rxjs';
import { MatchService, TTTButtonState } from 'src/app/services/match.service';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports:[CommonModule,MatButtonModule,MatListModule,MatIconModule,MatCardModule],
})
export class HomePageComponent implements OnInit {
  headerContent: String;
  buttons: Array<boolean|undefined>;
  currentPlayer:TTTButtonState = TTTButtonState.X;
  tableState$:Observable<Array<TTTButtonState|undefined|null>>;
  constructor(private match: MatchService) {
    this.headerContent=`Turn of: ${this.currentPlayer}`; 
    this.buttons = new Array(9);
    this.tableState$ = match.$table;
    this.match.matchStatus$.subscribe((value)=>{
      if(value){
        alert(value.toString());
      }
    });
  }
  ngOnInit(): void {
    this.match.clearTable();
  }
  newMatch(){
    this.match.clearTable();
  }
  onButtonClick(index:number,player:TTTButtonState):void{
    if(this.match.makeMove(index,player)){
      this.togglePlayer();
    }
  }
  private togglePlayer(){
    this.currentPlayer = this.currentPlayer == TTTButtonState.X ? TTTButtonState.O : TTTButtonState.X;
    this.headerContent=`Turn of: ${this.currentPlayer}`; 
  }
}
