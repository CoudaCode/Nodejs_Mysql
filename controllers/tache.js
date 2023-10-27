import Tache from "../models/tache.js";
import express from "express";
class TacheController {
  /**
   *
   * @param {express.Resquest} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */

  static async createTache(req, res) {
    try {
      const { userId, ...body } = req.body;

      const auth = req.user;
      const tache = await Tache.create({
        userId: auth.id,
        ...body,
      });

      if (!tache) {
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la creation" });
      }
      res.status(200).json({ statut: true, message: tache });
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

  static async editTache(req, res) {
    try {
      const { id } = req.params;
      const { ...body } = req.body;
      const auth = req.user;

      const tache = await Tache.findByPk(id);
      console.log("auth", auth.id);
      console.log("userId", tache.userId);
      if (tache.userId !== auth.id) {
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la recuperation" });
      }

      const tacheUpdated = await tache.update({
        userId: auth.id,
        ...body,
      });
      if (!tacheUpdated) {
        return res
          .status(200)
          .json({ statut: false, message: "erreur lors de la modification" });
      }

      res.status(200).json({ statut: true, message: tacheUpdated });
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

  static async deleteTache(req, res) {
    try {
      const user = req.user;
      const { id } = req.params;
      const tache = await Tache.findByPk(id);
      if (!tache || tache.userId !== user.id) {
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la recuperation" });
      }
      const tacheDeleted = await tache.destroy({ where: { id } });

      if (!tacheDeleted) {
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la suppression" });
      }

      res.status(200).json({ statut: true, message: "tache suprimée" });
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

  static async getTache(req, res) {
    try {
      const user = req.user;
      const { id } = req.params;
      const tache = await Tache.findByPk(id);

      if (!tache || tache.userId !== user.id) {
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la recuperation" });
      }
      res.status(200).json({ statut: true, message: tache });
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

  static async getAllTache(req, res) {
    try {
      const user = req.user;

      const tache = await Tache.findAll({ where: { userId: user.id } });

      if (!tache) {
        return res
          .status(400)
          .json({ statut: false, message: "erreur lors de la recuperation" });
      }

      res.status(200).json({ statut: true, message: tache });
    } catch (e) {
      res.status(500).json({ statut: false, message: e.message });
    }
  }
}

export default TacheController;
