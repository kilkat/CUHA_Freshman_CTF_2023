const router = require("express");
const User = require("../models/users");
const password_exp =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,18}$/; //password regExp
const alphabet_exp = /^[a-zA-Z]*$/; //alphabet regExp
const space_exp = /\s/g; //space regExp
const email_exp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //email regExp
const nickname_exp = /^[a-zA-Z]{1,20}$/;
const student_number_exp = /^[0-9]{8,10}$/;
const bcrypt = require("bcrypt");
const Already_solved = require("../models/already_solved");
const settings = async(req, res) => {
    const {password, re_password, nickname, email, student_number} = req.body;
    const session_email = req.session.email;
    const session_password = req.session.password;
    const session_student_number = req.session.student_number;
    const session_nickname = req.session.nickname;
    const session_name = req.session.name;

    const user_info = await User.findOne({where: {email: session_email}, attributes: ["email", "nickname", "point", "solved"]});

    const exUser1 = await User.findOne({ where: {nickname: nickname}});
    const exUser2 = await User.findOne({ where: {student_number: student_number}});

    if(session_email !== req.body.email){
      
        return res.send("<script>alert('이메일은 수정할 수 없습니다.');location.href='/settings';</script>");
    };

    if(session_name !== req.body.name){
      
        return res.send("<script>alert('이름은 수정할 수 없습니다.');location.href='/settings';</script>");
    };

    if(nickname.match(nickname_exp) === null || email.match(space_exp) !== null){
        return res.send("<script>alert('닉네임은 알파벳형태의 1~20자리 값만 허용합니다. 또한 공백, 띄어쓰기는 허용하지 않습니다.');location.href='/settings';</script>");
    };

    if(password.match(password_exp) === null || re_password.match(password_exp) === null || password.match(space_exp) !== null || re_password.match(space_exp) !== null){
        return res.send("<script>alert('비밀번호 형식은 숫자, 문자, 특수문자 포함 형태의 8~18자리 값만 허용됩니다. 또한 공백, 띄어쓰기는 허용하지 않습니다.');location.href='/settings';</script>");
    };

    if(password !== re_password) {
        return res.send("<script>alert('비밀번호가 일치하지 않습니다.');location.href='/settings';</script>")
    };

    if(student_number.match(student_number_exp) === null){
        return res.send("<script>alert('학번은 숫자 형태의 8~10자리 값만 서용합니다.');location.href='/settings';</script>");
    } 

    if(student_number.match(student_number_exp) === null){
        return res.send("<script>alert('학번은 숫자 형태의 8~10자리 값만 서용합니다.');location.href='/settings';</script>");
    } 

    if(session_nickname != nickname){
        var changed_nickname = nickname;
        const compare_nickname = await User.findOne({ where: {nickname: nickname}});
        if(compare_nickname){
            return res.send("<script>alert('중복된 닉네임이 있습니다.');location.href='/settings';</script>");
        }
    }

    if(session_student_number != student_number){
        var changed_student_number = student_number;
        const compare_student_number = await User.findOne({ where: {student_number: student_number}});
        if(compare_student_number){
            return res.send("<script>alert('중복된 학번이 있습니다.');location.href='/settings';</script>");
        }
    }

    await User.update({nickname: changed_nickname}, {where: {email:session_email}});
    await User.update({student_number: changed_student_number}, {where: {email:session_email}});
    await Already_solved.update({nickname: changed_nickname}, {where: {nickname:session_nickname}});
    bcrypt.hash(password, 10, (err, password) => {
        User.update({password: password}, {where: {email:session_email}});
    });

    req.session.destroy(function(){ 
        req.session;
        });
    return res.redirect("/login");


}



module.exports = {
    settings,
}