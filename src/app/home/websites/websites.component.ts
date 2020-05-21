import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeoService } from 'src/app/core/seo.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/internal/operators/take';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-websites',
  templateUrl: './websites.component.html',
  styleUrls: ['./websites.component.css']
})
export class WebsitesComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private _seoService: SeoService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.data
      .pipe(
        take(1)
      )
      .subscribe(data => {
        if (data) {
          this._seoService.updateTitle(data['title']);
          this._seoService.updateDescription(data['description']);
          this._seoService.updateOgTitle(data['title']);
          this._seoService.updateOgDescription(data['description']);
          this._seoService.updateOgUrl(data['ogUrl']);
          this._seoService.updateOgSiteName(data['ogSiteName']);
          this._seoService.updateOgImage(data['image']);
          this._seoService.updateTwitterTitle(data['title']);
          this._seoService.updateTwitterDescription(data['description']);
          this._seoService.updateTwitterImage(data['image']);
        }

      })
  }

  openContact(subject: string): void {
    this.dialog.open(ContactComponent, {
      data: subject
    }).afterClosed()
      .pipe(
        take(1)
      ).subscribe(res => {
        if(res){
          this.snackbar.open('Mensaje enviado. Nos pondremos en contacto lo antes posible!', 'Aceptar')
        }
      })
  }

}
