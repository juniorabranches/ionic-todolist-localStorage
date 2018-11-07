import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams, IonicPage } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  listaTarefas: any;
  listaConcluidas:any;
  qtdTarefas:any;
  qtdConcluidas:any;
  constructor(public loadingCtrl: LoadingController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    let loading = this.loadingCtrl.create({
      content: 'Carregando as Tarefas...'
    })
    loading.present();
    this.storage.get('tarefas').then(minhasTarefas => {
      this.listaTarefas = []
      for (let index = 0; index < minhasTarefas.length; index++) {
        this.listaTarefas.push({
          tarefa: minhasTarefas[index].tarefa,
          data: minhasTarefas[index].data,
          color: minhasTarefas[index].color
        })
      }
      this.qtdTarefas = this.listaTarefas.length;
    })

    this.storage.get('tarefasConcluidas').then(minhasTarefasConcluidas => {
      this.listaConcluidas = []
      for (let index = 0; index < minhasTarefasConcluidas.length; index++) {
        this.listaConcluidas.push({
          tarefa: minhasTarefasConcluidas[index].tarefa,
          data: minhasTarefasConcluidas[index].data,
          color: minhasTarefasConcluidas[index].color
        })
      }
      this.qtdConcluidas = this.listaConcluidas.length;
    })    

    loading.dismiss();
  }

  finalizar(index, item, itemSelect){
    let loading = this.loadingCtrl.create({
      content: 'Concluindo a Tarefa...'
    })
    loading.present();    
    this.listaConcluidas.push({
      tarefa: item.tarefa,
      data: item.data,
      color: item.color
    });
    this.listaTarefas.splice(index, 1);
    this.storage.set('tarefas', this.listaTarefas);
    this.storage.set('tarefasConcluidas', this.listaConcluidas)
    itemSelect.close();
    loading.dismiss()
  }

  apagar(index, itemSelect){
    let loading = this.loadingCtrl.create({
      content: 'Apagando a Tarefa...'
    })
    loading.present();     
    this.listaTarefas.splice(index, 1);
    this.storage.set('tarefas', this.listaTarefas)
    itemSelect.close();
    loading.dismiss();
  }
}
