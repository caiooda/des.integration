import { Router } from "express";
import Routes from "../infra/routes/Routes";

const routes = Router();

routes.use("/api", Routes);

export default routes;
