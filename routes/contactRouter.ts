import { Router } from "express";
import { getContacts, addContact, deleteContact } from "../controllers/contactController";

const contactRouter = Router();

contactRouter.get("/", getContacts);
contactRouter.post("/", addContact);
contactRouter.delete("/", deleteContact);

export default contactRouter;
