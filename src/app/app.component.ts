import { Component } from '@angular/core';

// 1) Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  // Controla a view da opção "Cadastre-se"
  public registerOn: boolean;

  constructor(

    // 2) Injetar depedências
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
  ) { }

  // Quando o status do menu é trocado (aberto ou fechado)
  menuChanged() {

    // Obtém dados do login
    this.auth.onAuthStateChanged(
      (userData) => {
        if (userData) {

          // Obtém dados do Firestore
          this.afs.firestore.doc(`register/${userData.uid}`).get()
            .then((uData) => {

              // // Se já tem cadastro, oculta "Cadastre-se" do menu
              if (uData.exists) {
                this.registerOn = false;
              } else {
                this.registerOn = true;
              }
            });
        }
      }
    );
  }

}