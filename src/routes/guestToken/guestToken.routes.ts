import {
    createGuestTokenController,
    deleteGuestTokenController,
    getGuestTokenByIdController,
    getGuestTokensController,
    updateGuestTokenController,
} from "../../controller/guestToken/guestToken.controller.ts";
import { validateRequestBody } from "../../middlewares/validation/validator.middleware.ts";
import { GuestTokenSchema, GuestTokenUpdateSchema } from "../../validations/zodValidation.ts";
import { Router } from "express";

const router = Router();

router.post("/", validateRequestBody(GuestTokenSchema), createGuestTokenController);

router.get("/", getGuestTokensController);

router.get("/:id", getGuestTokenByIdController);

router.patch("/:id", validateRequestBody(GuestTokenUpdateSchema), updateGuestTokenController);

router.delete("/:id", deleteGuestTokenController);

export default router;