import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-accounts-settings',
  templateUrl: './accounts-settings.component.html',
  styleUrls: ['./accounts-settings.component.css']
})
export class AccountsSettingsComponent implements OnInit {

  
  
  constructor(private settingService: SettingsService) { }

  changeTheme(theme: string) {
    this.settingService.changeTheme(theme);
  }


  ngOnInit(): void {
    this.settingService.checkCurrentTheme();
  }

}
