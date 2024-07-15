import {CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
//import { appConfig } from './app.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit{

  APIURL :string = 'http://localhost:8001/';

  registerForm! : FormGroup;

  isSubmitted: boolean= false;
  title="Nexus"
  constructor(private http: HttpClient,private fb: FormBuilder){}
  
  ngOnInit(){
    this.registerForm = this.fb.group({
      username:['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit():void{
    const body = {
      username: this.registerForm.get('username')?.value ?? '',
      email: this.registerForm.get('email')?.value ?? '',
      password: this.registerForm.get('password')?.value ?? ''
    };


    const headers = new HttpHeaders({
      'Content-Type': 'application/json-patch+json'
    });


   console.log(this.APIURL+"getData");



this.http.post(this.APIURL + 'getData', JSON.stringify(body), { headers }).subscribe({
  next: (res: any) => {
    console.log("success");
    alert("Success");
  },
  error: (error: any) => {
    console.log("error");
    alert("Error");
  },
  complete: () => {
    console.log("complete");
  }
});

  }
  


  
}


    /*
    
    this.isSubmitted=true
    this.http.post(this.url, this.registerForm)
    .subscribe((response: any) => {
      console.log('Form data submitted successfully:', response);
    }, (error: any) => {
      console.error('Error submitting form data:', error);
    });
    */
