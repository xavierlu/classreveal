import { Platform } from "ionic-angular";
import { Injectable } from "@angular/core";
import { Network } from "@ionic-native/network";
import "rxjs/add/operator/map";

declare var Connection;

@Injectable()
export class ConnectivityService {
  constructor(public platform: Platform, public network: Network) {}

  isOnline(): boolean {
    if (this.network.type) {
      return this.network.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if (this.network.type) {
      return this.network.type === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }
}
