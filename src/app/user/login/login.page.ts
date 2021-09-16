import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData: any;

  constructor(

    // 2) Injeta dependências
    public auth: AngularFireAuth,
    private router: Router,
    public alert: AlertController,
    public afs: AngularFirestore, // Firestore
  ) { }

  ngOnInit() { }

  // 4) Método de login
  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

      // Se o login funcionar
      .then(
        (data: any) => {

          console.log(data.user.displayName, data.user.uid);

          this.afs.firestore.doc(`register/${data.user.uid}`).get()
            .then((uData) => {

              // Se tem perfil
              if (uData.exists) {
                this.feedback(
                  data.user.displayName,
                  'Você já pode acessar o conteúdo restrito.',
                  '/user/profile'
                );
              } else {
                this.feedback(
                  data.user.displayName,
                  'Você precisa completar seu cadastro para acessar o conteúdo restrito.',
                  '/user/register'
                );
              }
            });
        }
      )

      // Se o login falhar
      .catch(
        (error) => {
          console.log(error)
        }
      );
  }

  // 5) Feeback e saida da página
  async feedback(userName: string, message: string, routerLink: string) {
    const alert = await this.alert.create({
      header: `Olá ${userName}!`,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate([routerLink]);
        }
      }]
    });

    await alert.present();
  }
}
