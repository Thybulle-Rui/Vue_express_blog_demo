const express = require('express')
const app = express()

// 允许跨域访问，3000和8080
app.use(require('cors')())
app.use(express.json())

// 定义数据模型
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/element-admin', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true
})

const article_schema = new mongoose.Schema({
    title: {type: String},
    body: {type: String}
})

const Article = mongoose.model('Article', article_schema)

app.get('/', async (req, res) => {
    res.send('index')
})
// 新增文章
app.post('/api/articles', async(req, res) => {
    const article = await Article.create(req.body)
    res.send(article)
})

// 显示文章内容
app.get('/api/articles', async (req, res) => {
    const articles = await Article.find()
    res.send(articles)
})

// 删除文章
app.delete('/api/articles/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.send({
        status: true
    })
})

// 文章详情接口
app.get('/api/articles/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.send(article)
})

// 修改文章接口
app.put('/api/articles/:id', async (req, res) => {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body)
    res.send(article)
})

app.listen(3001, () => {
    console.log('http://localhost:3001')
})