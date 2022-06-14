import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { saveNewLocationToDB } from "../controllers/locationController";
import Location from "../models/Location";
import { LOCATION_UPDATE_RATE_SECONDS } from "../utils/constants";
import {io} from "./../server"

const listener = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  let timer = new Date();
  console.log("a user connected", socket.id);
  let count = 0;
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
  socket.on("location", async (data) => {
    let obj = {
      ...data,
      senderIp: socket.handshake.address,
    };
    try {
      // check if timer is more than 1 minute
      if (new Date().getTime() - timer.getTime() > LOCATION_UPDATE_RATE_SECONDS * 1000) {
        console.log("Saving", count++);
        await saveNewLocationToDB(obj);
        timer.setSeconds(timer.getSeconds() + LOCATION_UPDATE_RATE_SECONDS);
      }
    } catch (error) {
      console.log(obj);
      console.log(error);
    }
  });
};

let locationListener = Location.watch();
// io.emit("message",change.fullDocument)

locationListener.on("change",(change)=>{
  io.emit("busLocation",change.fullDocument)
})

export default listener;
