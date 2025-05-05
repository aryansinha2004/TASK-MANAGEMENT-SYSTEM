import Member from "../../models/member.mjs";
import bcrypt from "bcryptjs";
import deleteFile from "../../utils/file.mjs";

export const getTeam = (req, res, next) => {
    Member.find({company: req.admin.company})
    .then(members =>{
        res.render("admin/team", {
            docTitle: `Admin | Members`,
            team: members
        })
    })
    .catch(e => console.log(e));
}

export const getAddMember = (req, res, next) => {
    res.render("admin/add_member", {
        docTitle: "Add Member",
        path: "admin/add",
        editing: false,
        member: req.admin,
        dob: "",
        doj: ""
    })
}

export const postAddMember = (req, res, next) => {
    const password = req.body.password;
    const image = req.file;
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const newMember = new Member({
            name: req.body.name,
            image: image.path,
            company: req.admin.company,
            email: req.body.email,
            phone: req.body.phone,
            position: "Member",
            password: hashedPassword
        });
        return newMember.save();
    })
    .then(() => {
        res.redirect("/admin/team");
    })
    .catch((e) => console.log(e));
}

export const getEditMember = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) return res.redirect('/admin/team');
    const memberId = req.params.memberId;
    Member.findById(memberId)
    .then(member => {
        if(!member) return res.redirect("/admin/team");
        res.render("admin/add_member", {
            docTitle: "Edit Member",
            path: "/admin/edit-member",
            editing: editMode,
            member: member,
        });
    })
    .catch(e => console.log(e));
}

export const postEditMember = (req, res, next)=>{
    const memberId = req.body.memberId;
    const password = req.body.password;
    const image = req.file;
    Member.findById(memberId)
    .then(member => {
        if(member.id.toString() !== req.body.memberId.toString()) return respond.redirect('/admin/team');
        bcrypt.hash(password, 12)
        .then((hashedPassword) => {
            member.name = req.body.name;
            member.email = req.body.email;
            member.phone = req.body.phone;
            member.position = member.position;
            member.password = hashedPassword;
            if(image){
                deleteFile(member.image);
                member.image = image.path;
            }
            return member.save()
        })
        .then(() => res.redirect("/admin/team"));
    })
    .catch(e => console.log(e));
}

export const postDeleteMember = (req, res, next) => {
    const memberId = req.body.memberId;
    Member.findById(memberId)
    .then((member) => {
        deleteFile(member.image);
        return Member.deleteOne({_id: memberId})
    })
    .then(() => res.redirect("/admin/team"))
    .catch(e => console.log(e));
}