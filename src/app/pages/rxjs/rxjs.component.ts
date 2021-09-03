import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs!: Subscription;

  constructor() {
    // this.retornaObservable().subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.warn('Error: ', error),
    //   () => console.info('Obs terminado')
    // )

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log)
  }


  retornaIntervalo() {
    return interval(500)
              .pipe(
                // take(10),
                map( valor => valor + 1),
                filter( valor => ( valor % 2 === 0) ? true : false )
              )
  }

   retornaObservable() {
    let i = -1;

    const obs$ = new Observable<number>( observer => {
      const intervalo = setInterval( () => {

        i++
        observer.next(i);

        if(i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if(i === 2) {
          observer.error('i llego al valor 2');
        }
      }, 1000)
    });

    return obs$;
   }


   ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }



}
