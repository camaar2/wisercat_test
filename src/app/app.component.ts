import { Component, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl
} from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MessageComponent } from "./message/message.component";
import { ApiService } from "./service/api.service";

@Component({
    selector: "app-root",
    template: `
    <div class="container">
      <div class="header">
        <img src="assets/logo2.png" alt="Logo" class="logo" />
      </div>

      <app-message
        [errorMessage]="errorMessage"
        [infoMessage]="infoMessage"
        [successMessage]="successMessage"
      ></app-message>

      <div class="register-form">
        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
          <div class="form-group">
            <label>Name</label>
            <input
              type="text"
              formControlName="firstName"
              class="form-control"
              [ngClass]="{ 'is-invalid': f['firstName'].touched && f['firstName'].errors }"
              (blur)="onBlur('firstName')"
            />
            <div *ngIf="f['firstName'].touched && f['firstName'].errors" class="error">
              <div *ngIf="f['firstName'].errors['required']">
                First Name is required
              </div>
              <div *ngIf="f['firstName'].errors['containsNumber']">
                Name cannot contain a number
              </div>
              <div *ngIf="f['firstName'].errors['minlength']">
                Name must be at least 2 characters
              </div>
              <div *ngIf="f['firstName'].errors['maxlength']">
                Name cannot exceed 20 characters
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Surname</label>
            <input
              type="text"
              formControlName="surName"
              class="form-control"
              [ngClass]="{ 'is-invalid': f['surName'].touched && f['surName'].errors }"
              (blur)="onBlur('surName')"
            />
            <div *ngIf="f['surName'].touched && f['surName'].errors" class="error">
              <div *ngIf="f['surName'].errors['required']">
                Surname is required
              </div>
              <div *ngIf="f['surName'].errors['containsNumber']">
                Surname cannot contain a number
              </div>
              <div *ngIf="f['surName'].errors['minlength']">
                Surname must be at least 2 characters
              </div>
              <div *ngIf="f['surName'].errors['maxlength']">
                Surname cannot exceed 40 characters
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              formControlName="email"
              class="form-control"
              [ngClass]="{ 'is-invalid': f['email'].touched && f['email'].errors }"
              (blur)="onBlur('email')"
            />
            <div *ngIf="f['email'].touched && f['email'].errors" class="error">
              <div *ngIf="f['email'].errors['required']">Email is required</div>
              <div *ngIf="f['email'].errors['email']">Email is invalid</div>
              <div *ngIf="f['email'].errors['maxlength']">
                Email cannot exceed 40 characters
              </div>
              <div *ngIf="f['email'].errors['invalidEmail']">
                Email must contain .com or .ee
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Working Experience (months)</label>
            <input
              type="number"
              formControlName="workingExperience"
              class="form-control"
              [ngClass]="{
                'is-invalid': f['workingExperience'].touched && f['workingExperience'].errors
              }"
              (blur)="onBlur('workingExperience')"
              (input)="preventNegative($event)"
            />
            <div *ngIf="f['workingExperience'].touched && f['workingExperience'].errors" class="error">
              <div *ngIf="f['workingExperience'].errors['required']">
                Working Experience is required
              </div>
              <div *ngIf="f['workingExperience'].errors['invalidWorkingExperience']">
                Invalid working experience
              </div>
            </div>
          </div>

          <div class="buttons-container">
            <button type="submit" class="btn btn-primary" style="width: 150px;">
              Submit
            </button>
            <button
              type="button"
              (click)="onReset()"
              class="btn btn-info"
              style="width: 150px;"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>

  `,
    styleUrls: ["./app.component.css"]
  })
export class AppComponent {
  @ViewChild(MessageComponent) messageComponent!: MessageComponent;
  form: FormGroup;
  submitted = false;
  showResetMessage: boolean = false;
  errorMessage: string | null = null;
  infoMessage: string | null = null;
  successMessage: string | null = null;
  successMessageTimeout: any;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) {
    this.form = this.formBuilder.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          this.noNumberValidator,
        ],
      ],
      surName: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
          this.noNumberValidator,
        ],
      ],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(40),
          this.emailValidator,
        ],
      ],
      workingExperience: [
        "",
        [Validators.required, this.workingExperienceValidator],
      ],
    });

    this.form.valueChanges.subscribe(() => {
      this.showResetMessage = this.form.dirty;
    });
  }

  noNumberValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value&&/\d/.test(value)) {
      return { containsNumber: true };
    }
    return null;
  }

  emailValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (value&&!value.endsWith(".com") && !value.endsWith(".ee")) {
      return { invalidEmail: true };
    }
    return null;
  }

  workingExperienceValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    if (Validators.required(control) !== null) {
      return { required: true };
    }
    if (!/^\d{1,3}(\.\d)?$/.test(value.toString())) {
      return { invalidWorkingExperience: true };
    }
    if (parseFloat(value) > 600) {
      return { maxExceeded: true };
    }
    return null;
  }
  

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    Object.values(this.form.controls).forEach(control => {
      control.markAsTouched();
    });
  
    if (this.form.invalid) {
      this.errorMessage = 'Form input is not valid!';
      return;
    }
    this.apiService.submitFormData(this.form.value);
    this.successMessage = 'Data submitted successfully!';
    this.successMessageTimeout = setTimeout(() => {
      this.successMessage = null;
    }, 3000);
    this.infoMessage = null; 

    this.form.reset();
    this.form.get('workingExperience')?.setValue('');
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
    this.form.get('workingExperience')?.setValue('');
    this.errorMessage = null;
    this.successMessage = null;
    this.infoMessage = "Form is cleared"; 
    this.showResetMessage = false; 
    setTimeout(() => {
      this.infoMessage = null;
    }, 3000);
  }

  onBlur(controlName: string) {
    const control = this.form.get(controlName);
    if (control) {
        control.markAsTouched();
        this.errorMessage = null; 
    }
}

preventNegative(event: any): void {
  let value = parseFloat(event.target.value);
  if (isNaN(value) || value < 0) {
    event.target.value = 0;
  }
}
}
