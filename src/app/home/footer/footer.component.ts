import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  contactFormGroup: FormGroup;

  sending = new BehaviorSubject(1);
  sending$ = this.sending.asObservable();

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
    if (this.contactFormGroup.valid) {
      
      this.sending.next(2)
      const batch = this.af.firestore.batch();
      const ref = this.af.firestore.collection('mail').doc();

      let message = {
        to: ['mocharan@meraki-s.com'],
        from: this.contactFormGroup.get('mail').value,
        template: {
          name: 'email',
          data: {
            message: this.contactFormGroup.get('messege').value.split(/\r?\n/g).filter(option => !!option)
          }
        }
      }

      batch.set(ref, message)

      batch.commit().then(() => {
        this.sendMessage()

      }).catch(err => {
        console.log(err);
      })
    }
  }

  sendMessage() {
    const batch = this.af.firestore.batch();
    const ref = this.af.firestore.collection('mail').doc();
    const refCustomer = this.af.firestore.collection('customers').doc();

    let mess2 = {
      to: [this.contactFormGroup.get('mail').value],
      template: {
        name: 'thanks'
      }
    }

    batch.set(ref, mess2)

    batch.set(refCustomer, {
      email: this.contactFormGroup.get('mail').value,
      messege: this.contactFormGroup.get('messege').value,
      type: 'Consulta simple'
    })


    batch.commit().then(() => {
      this.sending.next(1)
      this.contactFormGroup.reset()

      Object.keys(this.contactFormGroup.controls).forEach(key => {
        this.contactFormGroup.controls[key].setErrors(null)
      });


    }).catch(err => {
      console.log(err);

    })
  }

}
