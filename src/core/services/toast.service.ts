import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {
	constructor(private toastCtrl: ToastController) {}

	showToast(message: string, time: number = 3000) {
		this.toastCtrl.create({
			message: message,
      duration: time,
      position: 'top'
		}).present();
	}
}
