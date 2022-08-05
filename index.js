// entry point 
import express from "express"; 
import {config} from "dotenv";
import pool from './server/db.js'
import path from 'path'
import {fileURLToPath} from 'url'


const app = express(); 
const db = ""
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let PORT = process.env.PORT; 
if(PORT == null || PORT =='') PORT = 8000;




app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")))
app.use(express.json())


//routes

app.get('/',  async (req, res) =>{
 try {
       console.log("homepage loaded")
   res.sendFile(path.resolve(__dirname, 'frontend', "index.html"))
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