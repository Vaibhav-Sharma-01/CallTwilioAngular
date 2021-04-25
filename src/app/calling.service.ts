import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
declare var Twilio: any;
@Injectable({
  providedIn: 'root'
})
export class CallingService {

  constructor(private http: HttpClient) { }

  public callingSubject  = new Subject<any>();
  private calls  = "http://localhost:3000";
  private capabilityTokenUrl = `${this.calls}/token`
  private callUrl = `${this.call}/trigger-call`
  private conn


  public callPhone(data: any) {
    return this.http.post(this.callUrl, data);
  }
  setup: boolean = false;
  public phoneNumber = ''
  public setUpcall = new Subject<any>();

  public getNumber() {
    return this.phoneNumber;
  }

  public setupDevice(phoneNumber: any) {
    this.phoneNumber = phoneNumber
    if(!this.setup) {
      this.getCapabilityToken().subscribe(
        (data: any) => {
          Twilio.Device.setup(data.token);
          this.setup = true;
          this.call(phoneNumber);
        }
      );
    } else {
      this.call(phoneNumber);
    }
    
  }

  public call(phoneNumber: any) {
    Twilio.Device.disconnect(() => {
      this.callingSubject.next('closeCall');
      this.setUpcall.next('closeCall');
    });
    if(Twilio.Device.status() == 'offline'){
      Twilio.Device.ready(() => {
        this.conn = Twilio.Device.connect({ number: phoneNumber });
      });
    } else {
        Twilio.Device.connect({ number: phoneNumber });
    }
    
  }

  public endCall() {
    if(this.setup) {
      this.setUpcall.next('closeCall');
    Twilio.Device.disconnectAll();
    }
  }

  public getCapabilityToken() {
    return this.http.get(`${this.capabilityTokenUrl}/`);
  }

  public muteCall() {
    this.conn.mute(true);
  }

  public unmuteCall() {
    this.conn.mute(false);
  }

}
