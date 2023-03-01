const router = require("express");
const First_blood  = require("../models/first_blood");
const Already_solved  = require("../models/already_solved");
const Flag = require("../models/flag");
const User = require("../models/users");
const web = 'web'



const challenge_flag = async(req, res) => {
    const user_flag = req.body.flag;
    const user_challenge_title = req.body.challenge_title;
    const user = await User.findOne({where: {email: req.session.email}});
    const flag_correct = await Flag.findOne({where: {challenge_title: user_challenge_title},raw:true});
    const user_already = await Already_solved.findOne({where: {challenge_title:user_challenge_title,nickname:req.session.nickname},raw:true});
    const first_blood = await First_blood.findOne({where: {type : user_challenge_title}});

    console.log(user_already)

if(user_already === null) {
    if(flag_correct.flag === user_flag) {
        if(first_blood === null) {
            First_blood.create({
                nickname: user.nickname,
                type: user_challenge_title,
            });
        } else {
            
        }
        point_num = user.point + flag_correct.point
        solved_num = user.solved + 1

        date = new Date();
        yyyy = date.getFullYear().toString().padStart(4, '0');
        mm = (date.getMonth() + 1).toString().padStart(2, '0');
        dd = date.getDate().toString().padStart(2, '0');
        hh = date.getHours().toString().padStart(2, '0');
        min = date.getMinutes().toString().padStart(2, '0');
        ss = date.getSeconds().toString().padStart(2, '0');
        sss = date.getMilliseconds().toString().padStart(6, '0');
        now_date = `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}.${sss}`;
        
        User.update({
            point: point_num,
            solved: solved_num,
            solved_time: now_date
          }, {
            where: { email: req.session.email }
          });
          
          Already_solved.create({
            
            nickname:req.session.nickname,
            challenge_title: user_challenge_title,
            solved_time: now_date
            
          });
        res.send("<script>alert('정답입니다.');history.back();</script>");
       
    } else {
        //console.log(flag_correct[0]);
        //console.log(flag_correct);
        res.send("<script>alert('오답입니다.');history.back();</script>");
    }
} else {
    res.send("<script>alert('이미 푼 문제입니다.');history.back();</script>");
}
}

       
    
    



module.exports = {
    challenge_flag,
}