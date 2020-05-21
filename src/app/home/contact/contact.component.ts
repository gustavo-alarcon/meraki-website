import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  sending = new BehaviorSubject(false);
  sending$ = this.sending.asObservable();


  contactFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public subject: string,
    private dialogRef: MatDialogRef<ContactComponent>,
    private af: AngularFirestore,
    //private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.contactFormGroup = this.fb.group({
      name: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      company: ['', Validators.required],
      messege: ['', Validators.required]
    })
  }

  send(): void {
    // TO DO: ENVIAR CORREO AL CLIENTE, GUARDAR DATOS EN FIRESTORE

    if (this.contactFormGroup.valid) {
      this.sending.next(true)
      const batch = this.af.firestore.batch();
      const ref = this.af.firestore.collection('mail').doc();
      const refCustomer = this.af.firestore.collection('customers').doc();

      let message = {
        to: ['galarcon@meraki-s.com', 'mpalomino@meraki-s.com'],
        from: this.contactFormGroup.get('mail').value,
        template: {
          name: 'email',
          data: {
            name: this.contactFormGroup.get('name').value,
            email: this.contactFormGroup.get('mail').value,
            phone: this.contactFormGroup.get('phone').value,
            company: this.contactFormGroup.get('company').value,
            messege: this.contactFormGroup.get('messege').value,
            service: this.subject
          }
        }
      }

      batch.set(ref, message)

      let newCustomer = {
        name: this.contactFormGroup.get('name').value,
        email: this.contactFormGroup.get('mail').value,
        phone: this.contactFormGroup.get('phone').value,
        company: this.contactFormGroup.get('company').value,
        messege: this.contactFormGroup.get('messege').value,
        type: this.subject,
        createDate: new Date()
      }

      batch.set(refCustomer, newCustomer)


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

    let mess2 = {
      to: [this.contactFormGroup.get('mail').value],
      template: {
        name: 'thanks',
        data: {
          name: this.contactFormGroup.get('name').value
        }
      }
    }

    batch.set(ref, mess2)
    batch.commit().then(() => {
      this.sending.next(false)
      this.contactFormGroup.reset()

      Object.keys(this.contactFormGroup.controls).forEach(key => {
        this.contactFormGroup.controls[key].setErrors(null)
      });

      this.dialogRef.close(true);


    }).catch(err => {
      console.log(err);

    })
  }

}
