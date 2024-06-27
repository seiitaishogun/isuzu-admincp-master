
import { STORAGE } from './helpers/storage';
import { Aurelia } from 'aurelia-framework';
// import { LicenseManager } from "ag-grid-enterprise/main";
import { PLATFORM } from 'aurelia-pal';
import 'eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css';

import "sweetalert";
// import '../styles/loading.css';
// comment out if you don't want a Promise polyfill (remove also from webpack.config.js)
import * as Bluebird from 'bluebird';

Bluebird.config({ warnings: false });


export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('ag-grid-aurelia'))
    .plugin(PLATFORM.moduleName('aurelia-validation'))
    .plugin(PLATFORM.moduleName('aurelia-bootstrap-datetimepicker'))
    .plugin(PLATFORM.moduleName('aurelia-dialog'), config => {
      config.useDefaults();
      config.settings.lock = true;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 9999;
      config.settings.enableEscClose = true;
    })
    .plugin(PLATFORM.moduleName('aurelia-google-maps'), config => {
      config.options({
          apiKey: 'AIzaSyCjB5Qu_h0b1sVE8zQD8e_0ZJN9Mysj4ts', // use `false` to disable the key
          apiLibraries: 'drawing,geometry', //get optional libraries like drawing, geometry, ... - comma seperated list
          options: { panControl: true, panControlOptions: { position: 9 } }, //add google.maps.MapOptions on construct (https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions)
          language:'' , // default: uses browser configuration (recommended). Set this parameter to set another language (https://developers.google.com/maps/documentation/javascript/localization)
          region: '', // default: it applies a default bias for application behavior towards the United States. (https://developers.google.com/maps/documentation/javascript/localization)
          markerCluster: {
              enable: true,
              src: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js', // self-hosting this file is highly recommended. (https://developers.google.com/maps/documentation/javascript/marker-clustering)
              imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // the base URL where the images representing the clusters will be found. The full URL will be: `{imagePath}{[1-5]}`.`{imageExtension}` e.g. `foo/1.png`. Self-hosting these images is highly recommended. (https://developers.google.com/maps/documentation/javascript/marker-clustering)
              imageExtension: 'png',
          }
      });
  })
    .feature(PLATFORM.moduleName('resources/index'))
    // 	baseConfig.configure(config);
    // })
    .feature('resources')
    .developmentLogging();

  // Uncomment the line below to enable animation.
  // aurelia.use.plugin('aurelia-animator-css');
  // if the css animator is enabled, add swap-order="after" to all router-view elements

  // Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  // aurelia.use.plugin('aurelia-html-import-template-loader')
  // LicenseManager.setLicenseKey('ag-Grid_EvaluationLicense_NotForProduction_100Devs24_April_2017__MTQ5Mjk4ODQwMDAwMA==45c3450a171d4f17e8facddb3f1162e2');
  await aurelia.start();
  aurelia.setRoot(PLATFORM.moduleName('app'));

  // if you would like your website to work offline (Service Worker), 
  // install and enable the @easy-webpack/config-offline package in webpack.config.js and uncomment the following code:
  /*
  const offline = await System.import('offline-plugin/runtime');
  offline.install();
  */
}
// init firebase

var firebase = require("firebase/app");
require("firebase/database");
var config = {
  apiKey: "AIzaSyC_fEKlapEbfm3yBtnnzttuqF5IOykQURQ",
  authDomain: "admincp-skeleton-db.firebaseapp.com",
  databaseURL: "https://admincp-skeleton-db.firebaseio.com",
  storageBucket: "admincp-skeleton-db.appspot.com",
  messagingSenderId: "593494488415"
};
firebase.initializeApp(config);

