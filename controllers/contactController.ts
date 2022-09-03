import { RequestHandler } from "express";
import Contact from "../models/Contact";
import APIFeatures from "../utils/apiFeatures";

export const getContacts: RequestHandler = async (req, res) => {
  try {
    let contacts = await new APIFeatures(Contact.find(), req.query).limitFields().sort().get();
    res.status(200).json({
      status: true,
      data: contacts,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const addContact: RequestHandler = async (req, res) => {
  try {
    let contact = await Contact.create(req.body);
    res.status(200).json({
      status: true,
      data: contact,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};

export const deleteContact: RequestHandler = async (req, res) => {
  try {
    let contact = await Contact.findByIdAndDelete(req.body.id);
    res.status(200).json({
      status: true,
      data: contact,
    });
  } catch (error: any) {
    res.status(500).json({
      status: false,
      error: error?.message,
    });
  }
};
