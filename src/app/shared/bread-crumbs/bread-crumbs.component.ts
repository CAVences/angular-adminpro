import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.css']
})
export class BreadCrumbsComponent implements OnDestroy {

  public titulo!: string;
  public tituloSubs!: Subscription;

  constructor(private router: Router) {
    this.tituloSubs = this.getArgumentosRuta().subscribe(({titulo}) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`
    })
  }


  getArgumentosRuta() {
    return this.router.events
      .pipe(
        filter( (event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data)
      )
      
  }

  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
  }


}
