import express from "express";
import personController from "../controller/person.controller.js";

const router = express.Router({ mergeParams: true });

router.get("/:personId/detail", personController.personDetail);

router.get("/:personId/medias", personController.personMedias);

export default router;
