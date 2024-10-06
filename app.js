const express = require('express')
const path = require('path')
const userModel = require('./models/user')
const { name } = require('ejs')

const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))


app.get('/', (req, res) => {
    res.render("index");
})


// C 
app.post('/create', async(req, res) => {
    
    let {name, email, image} = req.body;
    
    let createdUser = await userModel.create({
        name,
        email, 
        image
    })
    console.log(createdUser);
    res.redirect("/read");
})


// R
app.get('/read', async (req, res) => {
    
    let users = await userModel.find();   // find all users and return all users

    res.render("read", {users})

    //let singleUser = userModel.find({email:"786.meimran@gmail.com"});    //it will return just one user whose email id will be "786.meimran@gmail.com"

    //res.send(singleUser)
})


app.get('/edit/:id', async (req, res) => {
    
    let user = await userModel.findOne({_id: req.params.id})

    res.render("edit", {user})
})


// U
app.post('/update/:id', async (req, res) => {

    let {name, email, image} = req.body;

    await userModel.findOneAndUpdate({_id: req.params.id}, {name, email, image}, {new: true})

    res.redirect('/read')
})


// D
app.get('/delete/:id', async (req, res) => {

    await userModel.findOneAndDelete({_id: req.params.id}) 

    res.redirect("/read")
})


app.listen(3000)