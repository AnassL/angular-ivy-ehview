import { Component, OnInit, VERSION } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export interface Group {
    name: string;
    uriName: string;
}

export interface GroupYear {
    uriName: string;
    registeredYear: string;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})

export class AppComponent implements OnInit  {
  public groups$: Observable<Group[]>;
  public groupYears$: Observable<GroupYear[]>;

  groupForm: FormGroup;

  selectedGroupUriName = '';
  selectedYear = '';

  ngOnInit() {
    this.groupForm = new FormGroup({
      groupSelect: new FormControl(''),
      groupYearSelect: new FormControl('')
    });
    this.getGroups
  }

  getGroups() {
    this.groups$ = this.getGroupsNames();
    this.groups$.subscribe(res => {
      console.log(res),
      console.log(res[0]),
      console.log(res[0].name )
      this.groupForm.patchValue({ groupSelect: res[0].uriName });
      // this.loginForm.controls['groupSelect'].setValue(res[0].uriname);
      this.selectedGroupUriName = res[0].uriName;
      this.getGroupYears(this.groupForm.get('groupSelect').value);
    });
  }

  getGroupYears(selectedGroupUriName) {
    this.groupYears$ = this.getGroupYearsService(selectedGroupUriName);
    console.log(this.groupForm.get('groupSelect').value);
    this.groupYears$.subscribe(res => {
      this.groupForm.patchValue({ groupYearSelect: res[0] });
      this.selectedYear = res[0].registeredYear;

    });
  }

  getGroupYearsService(selectedUriName): Observable<GroupYear[]> {
    return of([
      {
        "uriName": "group-1",
        "registeredYear": "2019",
      },
      {
        "uriName": "group 2",
        "registeredYear": "2020",
      }
    ]).pipe(
      map(x => x.filter(oy => oy.uriName === selectedUriName))
    );
  }

  getGroupsNames() {
    // return this.http.get(this.getGroupsUrl);
    return of([
      {
        "name": "Group 1",
        "uriName": "group-1"
      },
      {
        "name": "Group 2",
        "uriName": "group 2"
      }
    ])
  }

  onGroupChange() {
    console.log(this.groupForm.value.groupSelect);
    this.selectedGroupUriName = this.groupForm.get('groupSelect').value;
    console.log(this.groupForm.get('groupSelect').value);
  }

  onGroupYearChange() {
    this.selectedYear = this.groupForm.get('groupYearSelect').value;
  }
}
