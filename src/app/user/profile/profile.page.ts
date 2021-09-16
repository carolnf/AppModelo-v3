import { Component, OnInit } from '@angular/core';

// 1) Importa
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  // Atributos
  private itemDoc: AngularFirestoreDocument<any>;
  item: any;

  constructor(

    // 2) Injeta
    public auth: AngularFireAuth,
    public afs: AngularFirestore,
    private router: Router,
  ) { }

  // Sempre que entramos nesta página
  ionViewWillEnter() {

    // Obtém dados do ligin
    this.auth.onAuthStateChanged(
      (userData) => {
        if (userData) {

          // Consulta cadastro no database
          this.afs.firestore.doc(`register/${userData.uid}`).get()
            .then((uData) => {

              if (!uData.exists) {

                // Se não tem cadastro, vai para a página de cadastro
                this.router.navigate(['/user/register']);
              } else {

                // Se tem cadastro, exibe perfil
                this.item = uData.data();
              }
            });
        }
      }
    );
  }

  ngOnInit() { }

  // 3) Abre perfil no Google
  profile() {
    window.open('https://myaccount.google.com/');
    return false;
  }

}
