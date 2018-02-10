import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

if (PROD_MODE) {
	enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

console.log(`VERSION: ${VERSION}`);
