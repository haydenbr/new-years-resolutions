import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingService {
	private loader: any;

	constructor(private loadingCtrl: LoadingController) {}

	present(content: string) {
		if (this.loader) {
			this.loader.data.content = content;
			return;
		}

		let loader = this.loadingCtrl.create({ content });
    loader.present();

    this.loader = loader;
	}

	dismiss() {
		if (this.loader) {
			this.loader.dismiss();
			this.loader = undefined;
		}
	}
}
