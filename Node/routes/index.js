const express = require("express");
const Board = require("../models/board");
const router = express.Router();
const moment = require("moment");

// GET / 라우터
router.get("/", (req, res) => {
  res.render("MainPage/MainPage.html", { title: "Express" });
});

router.get("/login", (req, res) => {
  // if(req.headers.cookie === undefined){
  //    res.render('MainPage/MainPage.html')
  // }else if(req.headers.cookies){
  res.render("login/login.html", { title: "Express" });
  // }
});

router.get("/Community", async (req, res, next) => {
  const boarders = await Board.findAll({
    order: [["post_id", "DESC"]],
    offset: 0,
  });
  boarders.forEach((el) => {
    el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
  });
  res.render("Community/Community", { boarders });
});

router.get("/Community-add", (req, res) => {
  res.render("Community/Community-add", { title: "Express" });
});

router.post("/Community", async (req, res, next) => {
  let body = req.body;
  const data = await Board.create({
    title: body.inputTitle,
    content: body.inputComment,
    boarder: body.inputBoarder,
  })
    .then((result) => {
      console.log("데이터 추가 완료");
      // res.redirect("/Community");
    })
    .catch((err) => console.log("데이터 추가 실패"));
});

router.get("/Community/:postId", async (req, res, next) => {
  //   console.log(req.params);
  //   console.log("++++++++++++++++++");
  const { postId } = req.params;
  const board = await Board.findOne({ postId });
  //   if (!board) {
  //     next(new Error("없음"));
  //     return;
  //   }
  res.render("Community/Community-detail", { board });
  //   const board = await Board.findOne({
  //     attributes: ["title", "boarder", "date", "content"],
  //     where: {
  //       post_id: post_id,
  //     },
  //   });
  //   res.render("Community/Community/:post_id", { board });
});

// router.get("/products/:productId", shopController.getProduct);

router.get("/Schedule", (req, res) => {
  res.render("Schedule/Schedule");
});
router.get("/register", (req, res) => {
  res.render("Register/signup");
});
router.get("/schedule", (req, res) => {
  res.render("Schedule/schedule");
});

router.get("/gongji", (req, res) => {
  res.render("Gongji/gongji");
});

router.get("/gongji/writePage", (req, res) => {
  res.render("writePage/writePage");
});

router.get("/profile", (req, res) => {
  res.render("profile/profile", {
    name: req.body.name,
    class: req.body.class,
  });
});

module.exports = router;
