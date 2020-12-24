import * as firebase from 'firebase/app';
import 'firebase/auth';
/* if you use any other firebase modules import they here.
 * for example:
 * import "firebase/database"
 */

export default function initFirebase() {
  const firebaseConfig = {
    apiKey: 'AIzaSyBpUiOTpehT1xZtD4csDfr0zqNxCJiy7Xc',
    authDomain: 'gullr-1713d.firebaseapp.com',
    projectId: 'gullr-1713d',
    storageBucket: 'gullr-1713d.appspot.com',
    messagingSenderId: '500120539486',
    appId: '1:500120539486:web:2c09db0b28f96b7f30bfcf'
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}
