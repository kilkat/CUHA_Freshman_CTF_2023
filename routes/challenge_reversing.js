const express = require("express");

const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
    if(!req.session.is_logined) {
        res.send("<script>alert('로그인 후 이용해주세요');location.href='/login';</script>");
    } else {
    res.render("challenges/challenge_reversing/category2_reversing.ejs", {session: req.session});
    }
});

router.get("/tutorial.exe", (req, res) => {
  if(!req.session.is_logined) {
      res.send("<script>alert('로그인 후 이용해주세요');location.href='/login';</script>");
  } else {
    const text = 'tutorial.exe';  
    res.setHeader('Content-Disposition', `attachment; filename=${text}`); // 이게 핵심 
    res.sendFile(path.join(__dirname, '../public/challenges_file/reversing', 'tutorial.exe'));
  }
});

router.get("/Warmup_of_reversing_chall", (req, res) => {
  if(!req.session.is_logined) {
      res.send("<script>alert('로그인 후 이용해주세요');location.href='/login';</script>");
  } else {
    const text = 'Warmup_of_reversing_chall';  
    res.setHeader('Content-Disposition', `attachment; filename=${text}`); // 이게 핵심 
    res.sendFile(path.join(__dirname, '../public/challenges_file/reversing', 'Warmup_of_reversing_chall'));
  }
});

router.get("/reversing1_chall", (req, res) => {
  if(!req.session.is_logined) {
      res.send("<script>alert('로그인 후 이용해주세요');location.href='/login';</script>");
  } else {
    const text = 'reversing1_chall';  
    res.setHeader('Content-Disposition', `attachment; filename=${text}`); // 이게 핵심 
    res.sendFile(path.join(__dirname, '../public/challenges_file/reversing', 'reversing1_chall'));
  }
});

router.get("/reversing2_chall", (req, res) => {
  if(!req.session.is_logined) {
      res.send("<script>alert('로그인 후 이용해주세요');location.href='/login';</script>");
  } else {
    const text = 'reversing2_chall';  
    res.setHeader('Content-Disposition', `attachment; filename=${text}`); // 이게 핵심 
    res.sendFile(path.join(__dirname, '../public/challenges_file/reversing', 'reversing2_chall'));
  }
});

module.exports = router;