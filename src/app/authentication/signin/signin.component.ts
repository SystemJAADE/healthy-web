import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { AuthService, LanguageService } from '@core';
import { AuthResponseDTO } from '@core/models/auth-response.dto';
import { TranslateModule } from '@ngx-translate/core';
import { UnsubscribeOnDestroyAdapter } from '@shared';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        MatButtonModule,
        MatMenuModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        TranslateModule
    ],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  flagvalue: string | string[] | undefined;
  defaultFlag?: string;
  countryName: string | string[] = [];
  langStoreValue?: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    public languageService: LanguageService
  ) {
    super();
  }

  listLang = [
    { text: 'Spanish', flag: 'assets/images/flags/spain.svg', lang: 'es' },
    { text: 'English', flag: 'assets/images/flags/us.svg', lang: 'en' },
  ];
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.langStoreValue = localStorage.getItem('lang') as string;
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/us.svg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
  }
  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';

    if (this.authForm.invalid) {
        this.error = 'Username and Password not valid !';
        return;
    }

    const credentials = {
        username: this.f['username'].value,
        password: this.f['password'].value,
        grand_type: 'password',
    };

    this.authService.loginCustom(credentials)
        .subscribe({
            next: (response: AuthResponseDTO) => {

                if (response) {
                    setTimeout(() => {
                        this.authService.setAccounts(response);
                        this.router.navigate(['/patient/dashboard']);
                        this.loading = false;
                    }, 1000);
                } else {
                    this.error = 'Invalid Login Credentials';
                }
            },
            error: (error) => {
                this.error = error.message || 'Login failed';
                console.log(error);
                this.submitted = false;
                this.loading = false;
            },
        }
        );
  }
}
