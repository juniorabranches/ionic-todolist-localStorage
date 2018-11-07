import { Component } from '@angular/core';
import { NavController, ToastController, IonicPage } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tarefa: any  = {
    tarefa: "",
    data: "",
    color: "",
  }
  listaTarefas:any;
  colors: Array<Array<String>> = [
    ["Azul", "#0039b5"],
    ["Verde", "#00b51e"],
    ["Violeta", "#b200b5"],
    ["Amarelo", "#c1c100"],
    ["Vermelho", "#b50000"],
    ["Preto", "#000000"]
  ]

  constructor(public toastCtrl: ToastController, public storage: Storage, public navCtrl: NavController) {
    this.listaTarefas = [];
    this.storage.get('tarefas').then(minhasTarefas => {
      for (let index = 0; index < minhasTarefas.length; index++) {
         this.listaTarefas.push({
           tarefa: minhasTarefas[index].tarefa,
           data: minhasTarefas[index].data,
           color: minhasTarefas[index].color
         })       
      } 
    })
  }

  salvar(){
    this.listaTarefas.push({
      tarefa: this.tarefa.tarefa,
      data: this.tarefa.data,
      color: this.tarefa.color
    })
    this.storage.set('tarefas', this.listaTarefas);
    let toast = this.toastCtrl.create({
      message: 'Tarefa Salva com Sucesso!!!',
      duration: 5000,
      position: 'bottom'
    })
    toast.present();
    this.tarefa = [];
  }

}
