import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  @Input() temas: any[];
  @Output() rooms = new EventEmitter();
  @Output() roomCreated = new EventEmitter();

  temaList = [];
  temaLeave = false;
  enabledTema = 'white';
  nv_dificuldade: number;
  nr_jogador: number;
  room = [];
  websocket: any;

  tema: any;

  id_usuario = localStorage.getItem('userId');
  
  getTemas() {
    this.httpClient
      .get('http://monica:64803/api/Tema')
      .pipe(
        map(res => res as any)
      )
      .subscribe(
        temas => {
          this.temas = temas
            .map(tema => {
              return {
                logo: tema.Icone,
                id_tema: tema.Id,
                titulo: tema.Tema,
                cor: tema.Cor,
                borderColor: 'white'
              } 
            });
         }
        );
  }

  getLogoTema = function(tema) {
    return 'assets/img/' + tema.logo;
  };

  getStyleTema = function(tema) {
    return tema.cor;
  };

  temaChoice = function(tema) {
    this.temaLeave = false;
    tema.borderColor = 'white';
    if (this.temaList.length < 5) {
      for (let i = 0; i < 5; i++) {
        if (this.temaList[i] === tema.id_tema) {
          this.temaList.splice(i, 1);
          this.temaLeave = true;
          tema.borderColor = 'white';
        }
      }
      if (this.temaLeave === false) {
        this.temaList.push(tema.id_tema);
        tema.borderColor = '#b0b4b7';
      }
    } else {
      for (let i = 0; i < 5; i++) {
        if (this.temaList[i] === tema.id_tema) {
          this.temaList.splice(i, 1);
          tema.borderColor = 'white';
        }
      }
    }
  };

  createRoom = function() {
    this.room = {
      NivelId: this.nv_dificuldade,
      TemasIds: this.temaList,
      Jogadores: this.nr_jogador,
      NovaSala: true
    };

    this.websocket.send(JSON.stringify(this.room));

  var _this = this; 

    this.websocket.onmessage = function(event) {
      _this.roomCreated.emit(JSON.parse(event.data));
    };
  };

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const uri = `ws://monica:64803/api/Sala?UsuarioId=${ this.id_usuario }`;

    this.websocket = new WebSocket(uri);

    var _this = this;

    this.websocket.onopen = () => {
      _this.websocket.send('getsalas');
    };

    this.websocket.onmessage = function(event) {
      _this.rooms.emit(JSON.parse(event.data));
    };

    this.getTemas();
  }
}
