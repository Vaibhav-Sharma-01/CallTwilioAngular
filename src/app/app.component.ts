import { Component, OnInit } from '@angular/core';
import { CallingService } from './calling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  num: string = "+91"
  count:number = 0
  callactive = false
  constructor(
    private callingApis: CallingService
    
  ){
    
  }
  ngOnInit(): void {
    console.log(this.callactive)
  }

  addnum(i: string){
    if(this.count<13){
      this.num+=i
      this.count++
    }
  }
  
  removenum(){
    if(this.count>0){
      this.num = this.num.slice(0, -1)
      this.count--
    }
  }



  call(){
    this.callactive = true;
    console.log(this.callactive)
    this.callingApis.setupDevice(this.num);
  }

  callEnd(){
    this.callactive = false
    console.log(this.callactive)
    this.callingApis.endCall();
  }

  callMute(){
    console.log("mute")
    this.callingApis.muteCall();
  }

  callUnmute(){
    console.log("unmute");
    this.callingApis.unmuteCall();
  }

  logs(){
    
  }

}
