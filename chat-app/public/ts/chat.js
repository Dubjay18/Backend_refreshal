const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

document
  .querySelector("#message-form")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    const message = e.target.elements.message.value;

    socket.emit("sendMessage", message, () => {
      console.log("Message delivered");
    });
  });

document
  .querySelector("#send-location")
  .addEventListener("click", () => {
    if (!navigator.geolocation) {
      return alert(
        "Geolocation is not supported by your browser."
      );
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      socket.emit("sendLocation", location);
    });
  });
