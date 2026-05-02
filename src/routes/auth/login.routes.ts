import { loginUserController } from "../../controller/auth/login.controller";
import { Router } from "express";

const router = Router();

router.post('/', loginUserController);