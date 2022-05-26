import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { IHousehold } from 'src/app/models/household.model';
import { IUser } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public authToken: string = this.userService.getAuthToken()
  public id: string = '10';
  public user!: IUser;
  public isUserLoading!: boolean;
  public household!: IHousehold;
  public isHouseholdLoading!: boolean;
  public totalEnergyUsedtoday!: number;
  public noData: boolean = false;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser() {
    this.isUserLoading = true;
    this.isHouseholdLoading = true;
    let currentUser = this.userService.getCurrentUser(this.authToken);
    let currentHousehold = this.userService.getCurrentHousehold(this.id, this.authToken);

    forkJoin([currentUser, currentHousehold]).subscribe({
      next: (res) => {
        if (res[0]) {
          this.user = res[0].data;
          this.isUserLoading = false;
        }
        if (res[1]) {
          this.household = res[1].data;
          this.isHouseholdLoading = false;
        }

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
    const genUsage = household.attributes.usage_data.gen_usage_today;
    const gridUsage = household.attributes.usage_data.grid_usage_today;
    this.totalEnergyUsedtoday = Math.round((genUsage + gridUsage) * 1e12) / 1e12;
  }

}
