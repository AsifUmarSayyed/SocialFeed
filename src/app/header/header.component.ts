import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  passwordForm!:FormGroup;
  currentUser:any=[];
  changeURL='http://localhost:8080/api/user/change/';
  UpdatedProfileURL='http://localhost:8080/api/user/';
  token:any=[];
  username:any;
  user:any=[];
  img:any;
  baseUrl:any
  constructor(private api: ApiService,private formBuilder:FormBuilder,private router:Router,private toastr: ToastrService,private http:HttpClient) { }

  
  ngOnInit(): void {
    this.baseUrl=this.api.baseUrl
    if(localStorage.getItem('currentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')!)
      console.log(this.currentUser._id);
      
    }
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token')!)
      console.log(this.token);

    }

    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      newpassword:  ['', Validators.required],
     verifypassword: ['', Validators.required],
    });

    // this.http.get<any>(this.UpdatedProfileURL+this.currentUser._id,{ headers: { "auth-token": this.token }}).subscribe((data:any)=>{
     this.api.getOneUser(this.currentUser._id).subscribe((data:any)=>{
      console.log(data);
      console.log(data.users.firstName);
      this.img=data.users.photo;
      this.username=data.users.firstName+" "+data.users.lastName;
    })
  }
  onclickchange(){
    // this.http.get<any>(this.UpdatedProfileURL + this.currentUser._id, { headers: { "auth-token": this.token } }).subscribe((data: any) => {
      this.api.getOneUser(this.currentUser._id).subscribe((data:any)=>{
      console.log(data);
    this.user=data.users;
    })
  }
  changepassword(){
    // this.http.patch(this.changeURL+this.currentUser._id,this.passwordForm.value).subscribe((data:any)=>{
    //       console.log(data);
          
    //    })

    

     if(this.passwordForm.value.newpassword==this.passwordForm.value.verifypassword){
     console.log('hii');
    
      // this.http.put(this.changeURL+this.currentUser._id,{password:this.passwordForm.value.password,newPassword:this.passwordForm.value.newpassword},{ headers: { "auth-token": this.token }}).subscribe((data:any)=>{
        this.api.updateUser(this.currentUser._id,{password:this.passwordForm.value.password,newPassword:this.passwordForm.value.newpassword}).subscribe((data:any)=>{
        console.log(data);
        if(data.success){
        this.toastr.success("Password changed successfully !!",data.message  )
      }
    else{
      this.toastr.error("Error !!",data.message  )
    }})
     }
    
    else{
      this.toastr.error("Password not match","Error" );
    }
    
  }
  Logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
