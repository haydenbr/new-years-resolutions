import { Injectable } from '@angular/core';

import { Device } from '@ionic-native/device';

@Injectable()
export class DeviceService {
	constructor(private device: Device) {}

	isApp() {
		return !!this.device.uuid;
	}

	isInMobileSafari() {
		let navigator = window.navigator;
		let userAgent = navigator && navigator.userAgent.toLowerCase();

		return userAgent && userAgent.includes('mobile') && userAgent.includes('safari');
	}
}
