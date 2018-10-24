import { Component, OnInit, Input } from '@angular/core';
import { Card } from './card';
import { Tema } from '../../tema';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() temas: Tema;

  constructor() { }

  ngOnInit() {
  }

}