import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService, LanguageService } from '@core';
import { RegisterDto } from '@core/models/register.dto';
import { DepartmentDto, DistrictDto, ProvinceDto } from '@core/models/ubigeo.dto';
import { TranslateModule } from '@ngx-translate/core';
import { Gender } from 'app/models/gender.enum';
import { UbigeoService } from './../../core/service/ubigeo.service';
@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        RouterLink,
        MatButtonModule,
        TranslateModule,
        MatOptionModule,
        MatSelectModule,
    ],
})
export class SignupComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  hide = true;
  chide = true;
  genders: { value: string, viewValue: string }[] = [];
  departments: DepartmentDto[] = []; 
  provinces: ProvinceDto[] = []; 
  districts: DistrictDto[] = [];
  flagvalue: string | string[] | undefined;
  defaultFlag?: string;
  countryName: string | string[] = [];
  langStoreValue?: string;
  selectedDepartmentId: string = '01';
  selectedProvinceId: string = '0101';
  selectedDistrictId: string  = '010101';


  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ubigeoService: UbigeoService,
    private authService: AuthService,
    public languageService: LanguageService
  ) { }
  
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
    this.genders = Object.keys(Gender).map(key => ({
      value: Gender[key as keyof typeof Gender],
      viewValue: key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()
    }));

    this.authForm = this.formBuilder.group({
      firstSurname: ['', Validators.required],
      secondSurname: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      documentIdentity: ['', Validators.required],
      gender: ['', Validators.required],
      cellPhone: ['', Validators.required],
      homePhone: ['', Validators.required],
      address: ['', Validators.required],
      ubigeoDepartmentId: ['', Validators.required],
      ubigeoProvinceId: ['', Validators.required],
      ubigeoDistrictId: ['', Validators.required],

      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10)]],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
    });
    this.loadDepartments();

    this.authForm.get('ubigeoDepartmentId')?.valueChanges.subscribe(value => {
      this.selectedDepartmentId = value;
      console.log('Departamento seleccionado ID:', this.selectedDepartmentId);
      this.loadProvinces(this.selectedDepartmentId);
    });

    this.authForm.get('ubigeoProvinceId')?.valueChanges.subscribe(value => {
      const selectedProvinceId = value;
      this.loadDistricts(this.selectedDepartmentId, selectedProvinceId);
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
    
 //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loadDepartments() {
    this.ubigeoService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments:', error);
      }
    );
  }

  loadProvinces(departmentId: string) {
    this.ubigeoService.getProvinces(departmentId).subscribe(
      (data) => {
        this.provinces = data;
      },
      (error) => {
        console.error('Error fetching provinces:', error);
      }
    );
  }

  loadDistricts(departmentId: string, provinceId: string) {
    this.ubigeoService.getDistricts(departmentId, provinceId).subscribe(
      (data) => {
        this.districts = data;
      },
      (error) => {
        console.error('Error fetching districts:', error);
      }
    );
  }

  get f() {
    return this.authForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    }
    const formValue = this.authForm.value;
    
    const registerDto: RegisterDto = {
      username: formValue.username,
      password: formValue.password,
      firstSurname: formValue.firstSurname,
      secondSurname: formValue.secondSurname,
      firstName: formValue.firstName,
      middleName: formValue.middleName,
      documentIdentity: formValue.documentIdentity,
      gender: formValue.gender as Gender,
      cellPhone: formValue.cellPhone,
      homePhone: formValue.homePhone,
      address: formValue.address,
      ubigeoDepartmentId: formValue.ubigeoDepartmentId,
      ubigeoProvinceId: formValue.ubigeoProvinceId,
      ubigeoDistrictId: formValue.ubigeoDistrictId
    };

    this.authService.registration(registerDto).subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        console.error('Error registratio user:', error);
      }
    )

    //mostrar un mensaje de éxito
  }
}
