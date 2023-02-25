const router = require("express");
const User = require("../models/users");

const user_rank = async(req, res) => {
    try{
        const user_info = await User.findAll({ 
            order:[
                ['point', "DESC"],
            ] });
            res.render("challenges/scoreboard.ejs", {session: req.session, rank: user_info})
    }catch(err){
        res.send("<script>alert('현재 scoreboard에 등록된 사람이 없습니다');location.href='/';</script>");
    }
}

module.exports = {
    user_rank,
}