import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@core';
@Component({
    selector: 'app-locked',
    templateUrl: './locked.component.html',
    styleUrls: ['./locked.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
    ],
})
export class LockedComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  userImg!: string;
  userFullName!: string;
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // constuctor
  }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
 
 /*   this.userImg = this.authService.currentUserValue.img;
    this.userFullName =
      this.authService.currentUserValue.firstName +
      ' ' +
      this.authService.currentUserValue.lastName;*/
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
    /*  const role = this.authService.currentUserValue.role;
      if (role === Role.All || role === Role.Admin) {
        this.router.navigate(['/admin/dashboard/main']);
      } else if (role === Role.Doctor) {
        this.router.navigate(['/doctor/dashboard']);
      } else if (role === Role.Patient) {
        this.router.navigate(['/patient/dashboard']);
      } else {
        this.router.navigate(['/authentication/signin']);
      }*/
    }
  }
}
