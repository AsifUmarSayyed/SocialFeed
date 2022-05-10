import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  editprofile!: FormGroup;
  currentUser: any = [];
  token: any = []
  img:any=""
  UpdateURL = 'http://localhost:8080/edit-profile/';
  UpdatedProfileURL = 'http://localhost:8080/api/user/';
  users: any = [];
  constructor(private api: ApiService,private formBuilder: FormBuilder, private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!)
      console.log(this.currentUser._id);

    }
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token')!)
      console.log(this.token);

    }
    this.editprofile = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      gender: ['', Validators.required],
      bio: ['', Validators.required],
      photo: "",
      name: "",
      dob: ['', Validators.required],

    });

    // this.http.get<any>(this.UpdatedProfileURL + this.currentUser._id, { headers: { "auth-token": this.token } }).subscribe((data: any) => {
     this.api.getOneUser(this.currentUser._id).subscribe((data: any) => {
      console.log(data);
      this.users = data.users;
      this.editprofile.patchValue(this.users);
    })
  }

  onFileChanged(event:any) {
    this.img = event.target.files[0];
  //   const formData=new FormData();
  //   formData.append("photo", event.target.files[0]);
  //   this.http.post<any>('http://localhost:8080/api/feed/upload',formData).subscribe((res:any)=>{
  // console.log(res.message.path);
  // this.img=res.message.path
  
//   });
}
  updateUser() {
    if(this.img){
    const formData=new FormData();
    formData.append("firstName", this.editprofile.value.firstName);
    formData.append("lastName", this.editprofile.value.lastName);
    formData.append("photo", this.img );
    formData.append("name", this.editprofile.value.firstName+" "+this.editprofile.value.lastName);
    formData.append("bio", this.editprofile.value.bio);

 
    formData.append("gender", this.editprofile.value.gender);
    formData.append("dob", this.editprofile.value.dob);
    formData.append("email", this.editprofile.value.email);
    formData.append("mobile", this.editprofile.value.mobile);


    // this.http.put(this.UpdatedProfileURL + this.currentUser._id, formData,{ headers: { "auth-token": this.token } }).subscribe((data: any) => {
   this.api.updateUser( this.currentUser._id, formData).subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/feed']);
        this.toastr.success("Profile Edited successfully !!", data.message)
      }
        , (err) => {
          this.toastr.error("Something went wrong !!", "Bad request")
        });
    }
    else{
this.api.updateUserWithoutPic(this.currentUser._id,this.editprofile.value).subscribe((data: any) => {
  console.log(data);
  this.router.navigate(['/feed']);
  this.toastr.success("Profile Edited successfully !!", data.message)
}
  , (err) => {
    this.toastr.error("Something went wrong !!", "Bad request")
  });


    }
                      
                        
                      
                        
 
   
  
    
  }
}
