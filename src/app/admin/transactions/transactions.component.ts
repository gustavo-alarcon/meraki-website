import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';
import { SidenavService } from 'src/app/core/sidenav.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/core/models/transaction.model';
import { DatabaseService } from 'src/app/core/database.service';
import { validateEventsArray } from '@angular/fire/firestore/public_api';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  transactionFormGroup: FormGroup;

  transactions$: Observable<Transaction[]>;

  from: Date;
  to: Date;

  constructor(
    private dbs: DatabaseService,
    private sidenav: SidenavService,
    public fb: FormBuilder
  ) {
    const view = this.dbs.getCurrentMonthOfView();

    this.transactions$ = this.dbs.getTransactions(view.from, view.to);
  }

  ngOnInit(): void {
    this.createForm();
  }

  toggleMenu(): void {
    this.sidenav.toggleAdminSidenav();
  }

  createForm():void {
    this.transactionFormGroup = this.fb.group({
      type: ['', Validators.required],
      date: ['', Validators.required],
      amount: ['', Validators.required],
      descBCP: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addTransaction(): void {
    this.dbs.addTransaction(this.transactionFormGroup.value);
  }

  deleteTransaction(id: string): void {
    this.dbs.deleteTransaction(id);
  }

}
