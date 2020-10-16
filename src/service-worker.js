// Register event listener for the ‘push’ event.

this.addEventListener("push", function (event) {
  // Keep the service worker alive until the notification is created.
  let { uuid, message } = event.data.json();
  event.waitUntil(
    // Show a notification with title of client window.identity,uuid and the message from the client.

    this.registration.showNotification(uuid, {
      body: `[${new Date(Date.now()).toTimeString().slice(0, 8)}]: ${message}`,
      icon: "https://dmntc.sse.codesandbox.io/favicon.ico",
      onclick: console.log
    })
  );
});
