import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports:[MatButtonModule,MatListModule]
})
export class HomePageComponent {
  headerContent: String = "header";

  constructor(private match: MatchService) {
    
  }
}
