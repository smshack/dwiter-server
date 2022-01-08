import express from "express";
import 'express-async-errors'

const router = express.Router();
// GET /tweets
// Get /tweets?username=:username
// GET / tweets/:id
// POST /tweets
// PUT / tweets/:id
// DELETE / tweets/:id
let tweets =[
    {
        id:'1',
        text:'공부공부 화팅',
        createdAt:Date.now().toString(),
        name:'jarry',
        username:'jarry',
        url:"https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg"
    },
    {
        id:'2',
        text:'하히하이',
        createdAt:Date.now().toString(),
        name:'ellie',
        username:'ellie',
        url:"https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg"
    }
]
// GET /tweets
// Get /tweets?username=:username
router.get('/',(req, res, next) => {
    const username = req.query.username;
    // 쿼리에 유저명이 있다면 배열 데이터에서 해당 username으로 필터링한 배열을 data에
    // 아니면 전체 반환
    const data = username ? tweets.filter(t =>t.username === username): tweets;
    res.status(200).json(data)
})

// GET / tweets/:id
router.get('/:id',(req, res, next) => {
    const id = req.params.id;
    const tweet = tweets.find((t)=> t.id === id);
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(204).send('No Content')
    }
})

// POST /tweets
router.post('/',(req, res, next) => {
    const {text, name, username} = req.body;
    const tweet ={
        id:Date.now().toString(),
        text,
        CreatedAt:new Date(),
        name,
        username
    }
    tweets = [tweet,...tweets]
    res.status(201).json(tweet)
})
// DELETE / tweets/:id
router.delete('/:id',(req, res, next) => {
    const id = req.params.id;
    tweets = tweets.filter(t=>t.id !==id);
    res.sendStatus(204);
})
// PUT / tweets/:id
router.put('/:id',(req, res, next) => {
    const id = req.params.id;
    const text = req.body.text;
    const tweet = tweets.find(t => t.id ===id)
    if(tweet){
        tweet.text = text;
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message:`Tweet id(${id}) not found`})
    }
    res.sendStatus(204);
})
export default router;