const userModel = require("../models/userModel");

// CREATE (INSERT)
async function createUser(req, res) {
  try {
    const result = await userModel.createUser(req.body);
    res.status(201).json({ message: "Usuario creado exitosamente", result });
  } catch (err) {
    res.status(500).json({ message: "Error al crear el usuario", error: err });
  }
}

// READ (SELECT)
// READ (SELECT)
async function getUsers(req, res) {
    try {
        const usersList = await userModel.getUsers();
        res.status(200).json(usersList);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los usuarios', error: err });
    }
}

// READ BY ID(SELECT)
async function getUser(req, res) {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el usuario', error: err });
    }
}


// UPDATE
async function updateUser(req, res) {
  try {
    const result = await userModel.updateUser(req.params.id, req.body);
    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente", result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar el usuario", error: err });
  }
}

// DELETE
async function deleteUser(req, res) {
  try {
    const result = await userModel.deleteUser(req.params.id);
    res.status(200).json({ message: "Usuario eliminado exitosamente", result });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar el usuario", error: err });
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
};
