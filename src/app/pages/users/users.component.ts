import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin, fromEvent, map, take } from 'rxjs';
import { HttpClientService } from 'src/app/core/services/http-client.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  obsArray: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  items$: Observable<any> = this.obsArray.asObservable();
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private http: HttpClientService) {
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    console.log('object');
    this.http.getUserData(this.currentPage, this.pageSize).subscribe(
      res => this.obsArray.next(res)
    )

    const content = document.querySelector('.items');
    const scroll$ = fromEvent(content!, 'scroll').pipe(map(() => content!.scrollTop));

    scroll$.subscribe((scrollPos) => {
      console.log('scrollPos', scrollPos);
      console.log(content?.scrollHeight);
      let limit = content!.scrollHeight - content!.clientHeight;
      console.log('limit =>', limit);
      if (Math.round(scrollPos) === limit || Math.round(scrollPos - 2) === limit || Math.round(scrollPos - 3) === limit || Math.round(scrollPos - 4) === limit) {
        this.currentPage += this.pageSize;
        forkJoin([this.items$.pipe(take(1)), this.http.getUserData(this.currentPage, this.pageSize)]).subscribe((data: Array<Array<any>>) => {
          const newArr = [...data[0], ...data[1]];
          this.obsArray.next(newArr);
        });
      }
    });
  }
}
