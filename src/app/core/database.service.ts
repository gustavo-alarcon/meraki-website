import { Injectable } from '@angular/core';
import { Transaction } from './models/transaction.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    public af: AngularFirestore
  ) { }

  getCurrentMonthOfView(): { from: Date, to: Date } {
    const date = new Date();
    const fromMonth = date.getMonth();
    const fromYear = date.getFullYear();

    const actualFromDate = new Date(fromYear, fromMonth, 1);

    const toMonth = (fromMonth + 1) % 12;
    let toYear = fromYear;

    if (fromMonth + 1 >= 12) {
      toYear++;
    }

    const toDate = new Date(toYear, toMonth, 1);

    return { from: actualFromDate, to: toDate };
  }

  getTransactions(from, to): Observable<Transaction[]> {
    console.log(from, to)
    return this.af.collection<Transaction>('db/admin/transactions', ref => ref.where('date', '>=', from).where('date', '<=', to).orderBy('date', 'desc'))
      .valueChanges()
      .pipe(
        shareReplay()
      )
  }

  addTransaction(form: Transaction): void {

    form.createdAt = new Date();

    this.af.collection('db/admin/transactions').add(
      form
    ).then(ref => {
      ref.update({id: ref.id}).then(() => {
        console.log('done!')
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  deleteTransaction(id: string): void {
    this.af.collection('db/admin/transactions').doc(id).delete();
  }
}
