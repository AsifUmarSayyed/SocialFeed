import { style } from '@angular/animations';
import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
 date=Date.now()
  showHeart: any = true
  UpdatedProfileURL = 'http://localhost:8080/api/user/'
  FeedGetURL = 'http://localhost:8080/api/feed?page=1&size=2';
  FeedPostURL = 'http://localhost:8080/api/feed';
  feedArr: any = []
  currentUser: any = [];
  show: any = false
  token: any = [];
  arr1: any = [];
  comment = false;
  flag = true
  username: any
  @ViewChild('f') data!: NgForm;
  @ViewChild('frm') frm!: NgForm;
  name = 'Angular';
  img!: File;
  your_new_name = '';
  your_comment = '';
  allUser: any = [];
  contentLoaded = false;

  listArray: string[] = [];
  sum = 100;
  direction = "";
  i = 2
  baseUrl:any
  constructor(private api: ApiService, private spinner: NgxSpinnerService, private router: Router, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.baseUrl=this.api.baseUrl
    if (localStorage.getItem('currentUser')) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser')!)
      console.log(this.currentUser._id);

    }
    if (localStorage.getItem('token')) {
      this.token = JSON.parse(localStorage.getItem('token')!)
      console.log(this.token);

    }

    // this.http.get<any>(this.UpdatedProfileURL,{ headers: { "auth-token": this.token }}).subscribe((data:any)=>{
    this.api.getUser().subscribe((data: any) => {
      this.allUser = data.users;
      console.log(this.allUser);


    })

    // this.http.get<any>(this.UpdatedProfileURL+this.currentUser._id,{ headers: { "auth-token": this.token }}).subscribe((data:any)=>{
    //   this.api.getOneUser(this.currentUser._id).subscribe((data:any)=>{
    //   // console.log(data.users);
    //   // this.username=data.users.firstName+" "+data.users.lastName;

    // })
    // this.http.get<any>(this.FeedGetURL,{ headers: { "auth-token": this.token }}).subscribe((res:any)=>{
    //   this.feedArr=res;
    //   console.log(this.feedArr.feeds);
    // })

    // this.http.get<any>('http://localhost:8080/api/feed?page=1&size=2', { headers: { "auth-token": this.token } }).subscribe((res: any) => {
      this.api.getFeedPagination(1,2).subscribe((res: any) => {

        console.log(res);
        this.feedArr = res;
        console.log(this.feedArr.feeds);
      })
      setTimeout(() => {
        this.contentLoaded = true;

        this.spinner.hide();
      }, 2000);


      //this.appendItems();
    }
  addComment(){
      this.comment = true;
    }


  onFileChanged(event: any) {
      this.img = event.target.files[0];


      //   this.http.post<any>('http://localhost:8080/api/feed/upload',formData).subscribe((res:any)=>{
      // console.log(res.message.path);
      // this.img=res.message.path

      // });
    }

  onSubmit() {
      const formData: any=new FormData();

      let cu=JSON.parse(localStorage.getItem('currentUser')!);
      this.currentUser = cu
    formData.append("caption", this.data.value.caption);
      formData.append("userId", cu._id);
      formData.append("photo", this.img);
      console.log(formData);


      // this .http.post<any>(this.FeedPostURL, formData, { headers: { "auth-token": this.token } }).subscribe((data: any) => {
        this.api.postFeed(formData).subscribe((data: any) => {
        console.log(data);



        this.toastr.success("Post Added successfully !!", "Success")

      })

    // this.http.get<any>(this.FeedGetURL, { headers: { "auth-token": this.token } }).subscribe((res: any) => {
        
      this.api.getFeed().subscribe((res: any) => {
      
      this.feedArr = res;
        console.log(this.feedArr.feeds);
         this.ngOnInit()

      })

      

    }
  onLike(fa: any){
      let arr=[]
  this.flag = true
  let val=0
 
    arr=fa.like;
      for(let i = 0;i<arr.length; i++){
      if (arr[i].userId == this.currentUser._id) {

        this.flag = false
        val = i
        break
      }
    }
    (this.flag) ? arr.push({ userId: this.currentUser._id }) : arr.splice(val, 1);
    (this.flag) ? this.flag = false : this.flag = true


    fa.like = arr;
 
   
   // this.http.put<any>(this.FeedPostURL + "/" + fa._id, fa, { headers: { "auth-token": this.token } }).subscribe((data: any) => {
   this.api.updateFeed( fa._id, fa).subscribe((data: any) => {
      console.log(data);

    })

  }
  onComment(fa: any,i:any) {
    let a:any=document.getElementsByClassName("comment") 
    console.log(a[i].value);
    

    if (!a[i].value.includes(" ")&& a[i].value!="") {
      
    
    let arr = []
    let val = 0
    console.log(fa._id);
    arr = fa.comment;
    arr.push({ userId: this.currentUser._id, comment: a[i].value, date: Date.now() })
    fa.comment = arr;
    // this.http.put<any>(this.FeedPostURL + "/" + fa._id, fa, { headers: { "auth-token": this.token } }).subscribe((data: any) => {
   this.api.updateFeed( fa._id, fa).subscribe((data: any) => {
     
      console.log(data);

    })
    a[i].value=""
  }

  }
  onScrollDown(ev: any) {
    console.log("scrolled down!!", ev);



    this.appendItems();
    this.direction = "scroll down";
  }



  appendItems() {
    this.addItems("push");
  }




  addItems(_method: string) {
    // for (let i = 0; i < this.sum; ++i) {
    //   if( _method === 'push'){
    //     this.http.get<any>('http://localhost:8080/api/feed?page=2&size=5',{ headers: { "auth-token": this.token }}).subscribe((res:any)=>{
    //       console.log(res);
    //       this.feedArr=res;
    //         console.log(this.feedArr.feeds);
    //      })
    //     }
    //   }

    // this.http.get<any>('http://localhost:8080/api/feed?page=' + ++this.i + '&size=1', { headers: { "auth-token": this.token } }).subscribe((res: any) => {
      this.api.getFeedPagination(++this.i,1).subscribe((res: any) => { 
    if (res.feeds[0]) {
        console.log(res.feeds[0]);

        this.feedArr.feeds.push(res.feeds[0])

        this.contentLoaded = false
        //this.spinner.show();
        setTimeout(() => {
          this.contentLoaded = true;
          //this.spinner.hide();
        }, 1000);


      }
    });

  }
  delete(fa: any) {
    if (confirm("Are you sure to delete post")) {
      // this.http.delete<any>("http://localhost:8080/api/feed/" + fa._id, { headers: { "auth-token": this.token } }).subscribe(res => {
        this.api.deleteFeed(fa._id).subscribe((res: any) => {
      console.log(res);

        this.toastr.error("Post Deleted Successfully !!", "Success")
      })

      // this.http.get<any>(this.FeedGetURL, { headers: { "auth-token": this.token } }).subscribe((res: any) => {
        this.api.getFeed().subscribe((res: any) => {
        this.feedArr = res;
        console.log(this.feedArr.feeds);
        this.ngOnInit()

      })
    }
  }
  likenow(fa: any) {
    let a: any = false
    fa.like.find((data: any) => {


      if (data.userId == this.currentUser._id) {

        a = true
      }

    })
    return a

  }
}
