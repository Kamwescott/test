// entry point 
import express from "express"; 
import {config} from "dotenv";
import pool from './db.js'
import path from 'path'
import {fileURLToPath} from 'url'


const app = express(); 
const db = ""
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let PORT = process.env.PORT; 
if(PORT == null || PORT =='') PORT = 8000;



const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//routes

app.get('/', async (req, res)=>{
    try {
        res.sendFile('index.html',{root: "client/public"})
    } catch (err) {
        console.log(err.message)
    }
})
//create todo
app.post('/todos', async (req, res) =>{
    try{
        const {description} = req.body; 
        const newTodo = await pool.query("INSERT INTO todos (description) VALUES($1) RETURNING *", 
        [description]
        );
        res.json(newTodo.rows[0])
    }
    catch(err){
        console.log(err.message)
    }
    finally{

    }
})

//get ALL todos
app.get("/todos", async(req, res) =>{
    try{
        res.setHeader("Content-Type", "text/javascript")
        const allTodos = await pool.query("SELECT * FROM todos");
        res.json(allTodos.rows)
        
    }
    catch(err){
        console.log(err.message)
    }
})

//get A todo 
app.get("/todos/:id", async(req, res) =>{
    try {
        const {id} = req.params
        const todo = await pool.query(`SELECT * FROM todos WHERE id = ${id}`);
        res.json(todo.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//update a todo
app.put("/todos/:id", async (req,res) =>{
    try {
        const{id} = req.params;
        const{description} = req.body;
        const update = await pool.query("UPDATE todos SET description = $1 WHERE id = $2", 
        [description, id])
        res.json("list updated")
    } catch (err) {
        console.log(err.message)
    }
})

//delete a todo
app.delete("/todos/:id", async (req, res)=>{
    try {
        const {id} = req.params; 
        const deleteTodo = await pool.query("DELETE FROM todos WHERE id = $1", [id]);
        res.json("todo was deleted")
    } catch (err) {
        console.log(err.message)
        
    }
})

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}` )
})