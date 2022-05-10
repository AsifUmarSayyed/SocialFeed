import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: any = "http://192.168.0.120:8080/"
  userUrl:any="api/user"
  feedUrl:any="api/feed"
  Header:any={headers:{"auth-token":  JSON.parse(localStorage.getItem("token")!)}}
  constructor(private http: HttpClient) { }
// *********************************************************************************************************
//                                    USER API
// *********************************************************************************************************


getUser(){
  return this.http.get<any>(this.baseUrl+this.userUrl)
 }
 getOneUser(id:any){
  return this.http.get<any>(this.baseUrl+this.userUrl+"/"+id)
 }
 postUser(body:any){
   return this.http.post<any>(this.baseUrl+this.userUrl,body)
 }
 postGoogleUser(body:any){
  return this.http.post<any>(this.baseUrl+this.userUrl+'/googleuser/',body)
}
 loginUser(body:any){
  return this.http.post<any>(this.baseUrl+this.userUrl+"/login",body)
}
 deleteUser(body:any){
  return this.http.delete<any>(this.baseUrl+this.userUrl+"/"+body)
}
updateUser(id:any,body:any){
  return this.http.put<any>(this.baseUrl+this.userUrl+"/"+id,body)
}
updateUserWithoutPic(id:any,body:any){
  return this.http.put<any>(this.baseUrl+this.userUrl+"/noPic/"+id,body)
}

// *********************************************************************************************************
//                                    FEED API
// *********************************************************************************************************
getFeed(){
  return this.http.get<any>(this.baseUrl+this.feedUrl)
 }

 getFeedPagination(page:any,size:any){
  return this.http.get<any>(this.baseUrl+this.feedUrl+'?page='+page+'&size='+size)
 }
 getOneFeed(id:any){
  return this.http.get<any>(this.baseUrl+this.feedUrl+"/"+id)
 }
 postFeed(body:any){
   return this.http.post<any>(this.baseUrl+this.feedUrl,body)
 }
 
 deleteFeed(body:any){
  return this.http.delete<any>(this.baseUrl+this.feedUrl+"/"+body)
}
updateFeed(id:any,body:any){
  return this.http.put<any>(this.baseUrl+this.feedUrl+"/"+id,body)
}


// *********************************************************************************************************
//                                    IMAGE API
// *********************************************************************************************************

}
