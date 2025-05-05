import Member from "../models/member.mjs";
import bcrypt from "bcryptjs";

export const getLogin = (req, res, next) => {
    res.render("client/login", {
        docTitle: "Tasksphere | Login"
    })
}

export const postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Member.findOne({email: email})
    .then(member => {
        bcrypt.compare(password, member.password)
        .then(match => {
            if(match){
                req.session.isAuthenticated = true;
                req.session.admin = member;
                return req.session.save(() => res.redirect("/admin"));
            }
            res.redirect("/login");
        })
        .catch(() => res.redirect('/login'));
    })
    .catch(() => res.redirect('/login'));
}

export const postLogout = (req, res, next) => {
    req.session.destroy(() => res.redirect("/"));
}

export const getSignup = (request, respond, next) => {
    respond.render("client/signup", {
        path: "/signup",
        docTitle: "Signup",
    });
}

export const postSignup = (req, res, next) => {
    const password = req.body.password;
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const teamLead = new Member({
            company: req.body.company,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            position: "Team Lead",
            password: hashedPassword
        });
        return teamLead.save();
    })
    .then(() => {
        res.redirect("/login");
    })
    .catch((e) => console.log(e));
}