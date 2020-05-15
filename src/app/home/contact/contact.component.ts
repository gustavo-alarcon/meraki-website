import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public subject: string,
    private dialogRef: MatDialogRef<ContactComponent>
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
    this.dialogRef.close(true);
  }

}
