import express from "express";
import { addTodo, deleteItem, getAllItem, updateItem } from "./todo.service.js";
import { Todo } from "./todo.model.js";
import { todoValidation } from "./todo.validation.js";
import { checkMongooseIdValidity } from "../utils/validation.js";
const router = express.Router();

//!Add Item
router.post("/todo/add", addTodo);

//!delete Item
router.delete("/todo/delete/:id", deleteItem);

//!update Item
router.put("/todo/update/:id", updateItem);

//!Get Item
router.get("/todo/items", getAllItem);

export default router;
