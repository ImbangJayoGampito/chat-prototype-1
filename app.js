console.log("hello!")
if ("serviceWorker" in navigator) {
  console.log("Service workers are supported.");
  window.addEventListener("load", function () {
    console.log("Registering service worker...");
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(res => {
        console.log("Service worker registered.");
        console.log(res);
      })
      .catch(err => {
        console.log("Service worker not registered.");
        console.log(err);
      });
  });
} else {
  console.log("Service workers are not supported.");
}

