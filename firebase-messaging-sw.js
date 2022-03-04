// importScriptsはservice worker内から他のserviceworkerを読み込むときに使えます
importScripts("https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js");

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAoj_V3DPgeLB-E8CWSNgAkgMgNiaCdl2I",
    authDomain: "mysecondapp-83178.firebaseapp.com",
    databaseURL: "https://mysecondapp-83178.firebaseio.com",
    projectId: "mysecondapp-83178",
    storageBucket: "",
    messagingSenderId: "296764364677",
    appId: "1:296764364677:web:606f3b244522d4b1f5d6ec"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();

/**
 * foreground時にメッセージを受け取ると、通知をする。通知の中身はtitleやoptionから設定できる。
 */
self.addEventListener("push", function(event) {
  const title = "Web担当者の休日";
  const options = {
    body: "新しい記事が公開されました。[push]",
    // 通知の右にでる画像
    icon:
      "",
      // 通知の左にでる画像
    badge: ""
  };

  event.waitUntil(self.registration.showNotification(title, options));
});


/**
 * background時の通知の扱い。ここではconsoleにメッセージを出力した上で、通知を出している。通知の中身はtitleやoptionから設定できる。
 */
messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };
  
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});