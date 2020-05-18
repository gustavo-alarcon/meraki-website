import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  contactFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private af: AngularFirestore
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.contactFormGroup = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      messege: ['', Validators.required]
    });
  }

  submit(): void {

    const batch = this.af.firestore.batch();
    const ref = this.af.firestore.collection('/db/crcLaJoya/outOfServiceRacks').doc();
    batch.set(ref, {
      to: ['mocharan@gmail.com'],
      message: {
        subject: 'Hello from Firebase!',
        text: 'This is the plaintext section of the email body.',
        html: 'This is the <code>HTML</code> section of the email body.',
      }
    })
    batch.commit().then(() => {
      console.log('enviado');

    })
    // 
  }

}
