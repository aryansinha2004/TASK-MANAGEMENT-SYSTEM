import Tasks from "../models/tasks.mjs";

const getHome = (req, res, next) => {
    Tasks.find({assignee: req.admin}).populate('assignor')
    .then(tasks => {
        res.render("admin/home", {
            docTitle: req.admin.company + " | Tasksphere",
            tasks: tasks
        })
    })
    .catch(e => console.log(e));
}
export default getHome;