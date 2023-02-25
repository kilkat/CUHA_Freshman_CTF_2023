const express = require("express");

const router = express.Router();
const path = require('path');
router.get("/", (req, res) => {
    if(!req.session.is_logined) {
        res.send("<script>alert('로그인 후 이용해주세요');location.href='/login';</script>");
    } else {
    res.render("challenges/challenge_crypto/category4_crypto.ejs", {session: req.session});
    }
});

router.get("/odt-IV-adb6be87eb09b76d.dat", (req, res) => {
  if(!req.session.is_logined) {
      res.send("<script>alert('로그인 후 이용해주세요');location.href='/login';</script>");
  } else {
    const text = 'odt-IV-adb6be87eb09b76d.dat';  
    res.setHeader('Content-Disposition', `attachment; filename=${text}`); // 이게 핵심 
    res.sendFile(path.join(__dirname, '../public/challenges_file/crypto', 'odt-IV-adb6be87eb09b76d.dat'));
  }
});

router.get("/key.txt", (req, res) => {
  if(!req.session.is_logined) {
      res.send("<script>alert('로그인 후 이용해주세요');location.href='/login';</script>");
  } else {
    const text = 'key.txt';  
    res.setHeader('Content-Disposition', `attachment; filename=${text}`); // 이게 핵심 
    res.sendFile(path.join(__dirname, '../public/challenges_file/crypto', 'key.txt'));
  }
});

module.exports = router;