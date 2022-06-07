import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  @Input()
  title!: string;
  @Input()
  subtitle!: string;
  @Input()
  errorMessage!: string;
  loading: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
