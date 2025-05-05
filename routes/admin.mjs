import express from "express";
import getHome from "../controllers/admin.mjs";
import {getTeam, getAddMember, postAddMember, getEditMember, postEditMember, postDeleteMember} from "../controllers/Admin/Team.mjs"
import {getAddTask, getEditTask, getTask, postAddTask, postCancelTask, postCompleteTask, postDeleteTask, postEditTask} from "../controllers/Admin/Task.mjs";
import isAuthorized from "../middlewares/isAuthorized.mjs"

const router = express.Router();

router.get("/", isAuthorized, getHome);

router.get("/team", isAuthorized, getTeam);
router.get("/add", isAuthorized, getAddMember);
router.post("/add", isAuthorized, postAddMember);
router.get("/edit-member/:memberId", isAuthorized, getEditMember);
router.post("/edit-member", isAuthorized, postEditMember);
router.post("/delete-member", isAuthorized, postDeleteMember);

router.get("/task", isAuthorized, getTask);
router.get("/add-task", isAuthorized, getAddTask);
router.post("/add-task", isAuthorized, postAddTask );
router.get("/edit-task/:taskId", isAuthorized, getEditTask);
router.post("/edit-task", isAuthorized, postEditTask);
router.post("/delete-task", isAuthorized, postDeleteTask);
router.post("/complete-task", isAuthorized, postCompleteTask);
router.post("/cancel-task", isAuthorized, postCancelTask)

export default router;