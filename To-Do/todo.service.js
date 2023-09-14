import { checkMongooseIdValidity } from "../utils/validation.js";
import { Todo } from "./todo.model.js";
import { todoValidation } from "./todo.validation.js";

//todo from put or edit add popover in react

export const addTodo = async (req, res) => {
  const todo = req.body;
  try {
    //?validating mongo ID
    const validation = await todoValidation.validateAsync(todo);
    if (!validation) {
      return res.status(400).send("Invalid Credential");
    }
    //?creating a new Item
    await Todo.create(todo);
  } catch (e) {
    res.status(400).send(e.message);
  }

  res.status(200).send("Added successfully");
};
//!delete a item
export const deleteItem = async (req, res) => {
  const todoId = req.params.id;

  try {
    //?validating mongo ID
    const validation = checkMongooseIdValidity(todoId);

    if (!validation) {
      return res.status(400).send("Invalid mongo ID");
    }
    //?finding Item
    const Item = await Todo.findOne({ _id: todoId });
    if (!Item) {
      return res.status(400).send("Item not found");
    }

    //?Deleting a Item
    await Todo.deleteOne(Item);

    return res.status(200).send("Deleted");
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

//!Update Item
export const updateItem = async (req, res) => {
  const itemId = req.params.id;
  const updateItem = req.body;
  try {
    //?validating mongo ID
    const validation = checkMongooseIdValidity(itemId);

    if (!validation) {
      return res.status(400).send("Invalid mongo ID");
    }

    //?validating  req.body
    const validationItem = await todoValidation.validateAsync(updateItem);

    if (!validationItem) {
      return res.status(400).send("Invalid Credentials");
    }

    //?finding Item
    const Item = await Todo.findOne({ _id: itemId });
    if (!Item) {
      return res.status(400).send("Item not found");
    }

    //?updating Item
    await Todo.updateOne(
      { _id: itemId },
      {
        $set: {
          name: updateItem?.name,
          date: updateItem?.date,
        },
      }
    );

    return res.status(200).send("Updated");
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

//!get all item
export const getAllItem = async (req, res) => {
  const items = await Todo.find();

  return res.status(200).send(items);
};
