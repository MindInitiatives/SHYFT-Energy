import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, forkJoin, Subject } from 'rxjs';
import { IHousehold } from 'src/app/models/household.model';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public id: string = '10';
  public user!: IUser;
  public isUserLoading!: boolean;
  public household!: IHousehold;
  public isHouseholdLoading!: boolean;
  public totalEnergyUsedtoday!: number;
  public noData: boolean = false;
  public errorMessage!: string;
  searchValue!: string;
  searchValueChanged: Subject<string> = new Subject<string>();
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser()
    this.loadSearchbar()
  }

  loadSearchbar() {
    this.searchValueChanged
            .pipe(
              debounceTime(2000),  // wait 2 sec after the last event before emitting last event
              distinctUntilChanged() // only emit if value is different from previous value
              )
            .subscribe((e: string) => {
              this.searchValue = e;
              if (this.searchValue.trim() == '') return;

              // Call your function which calls API or do anything you would like do after a lag of 2 sec
              this.getCurrentHousehold(this.searchValue)
             });
  }

  modelChangeFn(e: string) {
    this.searchValueChanged.next(e);
  }

  submitBtn() {
    this.getCurrentHousehold(this.searchValue)
  }

  getCurrentUser() {
    this.isUserLoading = true;
    this.isHouseholdLoading = true;
    let currentUser = this.userService.getCurrentUser();
    let currentHousehold = this.userService.getCurrentHousehold(this.id);

    forkJoin([currentUser, currentHousehold]).subscribe({
      next: (res) => {
        if (res[0]) {
          this.user = res[0].data;
          this.isUserLoading = false;
        }
        if (res[1]) {
          this.household = res[1].data;
          this.isHouseholdLoading = false;
          this.getTotalEnergyUsedToday(this.household)
        }

      
      },
      error: (err) => {
        console.log(err);
        this.isUserLoading = false;
        this.isHouseholdLoading = false;
        this.noData = true;
      }
    });
  }

  getCurrentHousehold(searchValue: string) {
    this.userService.getCurrentHousehold(searchValue)
    .subscribe({
      next: (res) => {
          this.household = res.data;
          this.isHouseholdLoading = false;
          this.getTotalEnergyUsedToday(this.household)
      },
      error: (err) => {
        console.log(err);
        this.isUserLoading = false;
        this.isHouseholdLoading = false;
        this.noData = true;
      }
    });
  }

  getTotalEnergyUsedToday(household: IHousehold) {
    if (!household) {
        this.errorMessage = 'Could not Fetch Total Energy used';
        return;
    }
    const genUsage = household.attributes.usage_data.gen_usage_today;
    const gridUsage = household.attributes.usage_data.grid_usage_today;
    this.totalEnergyUsedtoday = Math.round((genUsage + gridUsage) * 1e12) / 1e12;
  }

}
