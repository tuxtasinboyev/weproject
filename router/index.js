import { Router } from "express";
import controller from  "../controller/index.js"

const router=Router()

router
    .get("/api/students",controller.GET)
    .get("/api/students/:id",controller.GETID)
    .post("/api/students",controller.POST)
    .put("/api/students/:id",controller.PUT)
    .delete("/api/students/:id",controller.DELETE)
export default router