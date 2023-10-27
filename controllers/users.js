import { compareHash, Hash } from "./../utils/hash.js";
import { generateToken } from "../utils/token.js";
import User from "../models/users.js";
import express from "express";
class UsersController {
  /**
   *
   * @param {express.Resquest} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */

  static async createUser(req, res) {
    try {
      const { email, password, ...body } = req.body;
      const exist = await User.findOne({ where: { email } });

      if (exist) {
        return res
          .status(400)
          .json({ statut: false, message: "email deja existant" });
      }
      const user = await User.create({
        email,
        password: await Hash(password),
        ...body,
      });

      if (!user) {
        return res.status(400).json({
          statut: false,
          message: "erreur lors de la creation de l'utilisateur",
        });
      }
      res
        .status(201)
        .json({ statut: true, message: "User créé avec succès", data: user });
    } catch (error) {
      res.status(500).json({ statut: false, message: error.message });
    }
  }
  /**
   *
   * @param {express.Resquest} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */

  static async getAll(req, res) {
    try {
      const user = await User.findAll();

      if (!user) {
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la recuperation" });
      }
      res.status(200).json({ statut: true, message: user });
    } catch (error) {
      res.status(500).json({ statut: false, message: error.message });
    }
  }
  /**
   *
   * @param {express.Resquest} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */

  static async getUser(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const user = await User.findByPk(id);

      if (!user) {
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la recuperation" });
      }

      res.status(200).json({ statut: true, message: user });
    } catch (error) {
      res.status(500).json({ statut: false, message: error.message });
    }
  }
  /**
   *
   * @param {express.Resquest} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */

  static async editUser(req, res) {
    try {
      const { newPassword, ...body } = req.body;
      const { id } = req.params;
      const auth = req.user;
      const user = await User.findByPk(auth.id);
      if (!user) {
        return res
          .status(400)
          .json({ statut: false, message: "Utilisateur non trouvé" });
      }

      let updateData = body;

      if (newPassword) {
        updateData = {
          ...updateData,
          password: await Hash(newPassword),
        };
      }

      const updateUser = await User.update(updateData, { where: { id } });
      if (!updateUser) {
        return res
          .status(400)
          .json({ statut: false, message: "Erreur lors de la modification" });
      }

      res
        .status(200)
        .json({ statut: true, message: "Modification effectuée avec succès" });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }
  /**
   *
   * @param {express.Resquest} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */

  static async deleteUser(req, res) {
    try {
      const auth = req.user;
      const { id } = req.params;
      if (Number(id) !== auth.id) {
        return res
          .status(400)
          .json({ statut: false, message: "vous n'etes pas autorisé" });
      }
      const user = await User.destroy({ where: { id } });
      if (!user) {
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la suppression" });
      }
      res
        .status(200)
        .json({ statut: true, message: "suppression effectuée avec succès" });
    } catch {
      res.status(500).json({ statut: false, message: "erreur serveur" });
    }
  }
  /**
   *
   * @param {express.Resquest} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (user && (await compareHash(password, user.password))) {
        res.cookie("token", generateToken(user.id));
        return res.status(200).json({
          statut: true,
          message: "connexion reussi",
          token: generateToken(user.id),
        });
      }
      res
        .status(401)
        .json({ statut: false, message: "email ou password invalide" });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }
}

export default UsersController;
