
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userType: 'patient' | 'doctor' = 'patient';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  setUserType(type: 'patient' | 'doctor'): void {
    this.userType = type;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // In a real app, send registration data to backend
      console.log(this.registerForm.value);
      // Show success message using your preferred toast library
      this.router.navigate(['/login']);
    }
  }
}
