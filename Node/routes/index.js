const express = require("express");
const Board = require("../models/board");
const router = express.Router();
const moment = require("moment");
const { now } = require("moment");

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
  try {
    let body = req.body;
    //  console.log(body);
    //  console.log(body.inputContent);
    await Board.create({
      title: body.inputTitle,
      content: body.inputContent,
      boarder: body.inputWriter,
    });
    res.redirect("Community");
    //  return res.status(200).send("success");
  } catch (err) {
    next(err);
  }
});

// router.get("/products/:productId", shopController.getProduct);
// select
router.get("/Community/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const board = await Board.findOne({ where: { post_id: postId } });
  //   밑에 날짜 처리하니 깨짐
  //   board.dataValues.date = moment(board.dataValues.date).format("YYYY-MM-DD");
  //   boarders.forEach((el) => {
  //     el.dataValues.date = moment(el.dataValues.date).format("YYYY-MM-DD");
  //   });
  res.render("Community/Community-detail", { board });
  // error 처리
});

// update
router.put("/Community/update/:postId", async (req, res, next) => {
  try {
    let body = req.body;
    console.log("=========================");
    console.log(body);
    console.log(body.inputContent);
    console.log("=========================");
    await Board.update(
      {
        //   post_id: this.post_id,
        title: body.inputTitle,
        content: body.inputContent,
        boarder: body.inputWriter,
        //   date: now,
      },
      {
        where: { post_id: req.params.postId },
      }
    );
    // res.redirect("/Community/" + req.params.postId);
    return res.status(200).send("success");
  } catch (err) {
    next(err);
  }
});

// 업데이트 창 가져오기
router.get("/Community/:postId/update", async (req, res, next) => {
  const { postId } = req.params;
  const board = await Board.findOne({ where: { post_id: postId } });
  res.render("Community/Community-update", { board });
  // 제목
  // 작성자
  // 내용
});

router.delete("/Community/delete/:postId", async (req, res, next) => {
  const { postId } = req.params;
  console.log("====================");
  console.log(postId);
  console.log("====================");
  const board = await Board.destroy({ where: { post_id: postId } });
  res.render("Community", { board });
});

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
