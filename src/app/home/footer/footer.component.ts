import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  contactFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder
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
    // 
  }

}
