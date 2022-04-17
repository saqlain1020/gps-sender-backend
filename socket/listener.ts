import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const listener = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  console.log("a user connected", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
  socket.on("location", (data) => {
    console.log(data);
  });
};

export default listener;
