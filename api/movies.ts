import  express  from "express";
import { conn } from "../dbconn";
import mysql from 'mysql';
import {MovieGetResponse} from "../model/model";




export const router = express.Router();

// router.get("/",(req,res)=>{
//     res.send("get in movie");
    
// });

router.get("/",(req,res)=>{
    let sql = "select * from movies"
    conn.query(sql,(err,result)=>{
        if(err){
            res.status(400).json(err);
        }else{
            res.json(result);
        }
    });
});

//Serch
router.get("/:title",(req,res)=>{
    const title = "%"+req.params.title+"%";
    let sql = "SELECT * FROM movies WHERE title LIKE  ?";
    conn.query(sql,[title],(err,result)=>{
        if(err){
            res.status(400).json(err);
        }else{
            res.json(result);
        }
    });
});


//add
router.post("/",(req,res)=>{
    const movie : MovieGetResponse = req.body;
    let sql = "INSERT INTO `movies`(`title`, `year`, `genre`, `director`, `plot`, `poster`, `rating`) VALUES (?,?,?,?,?,?,?)"

    sql = mysql.format(sql,[
        movie.title,
        movie.year,
        movie.genre,
        movie.director,
        movie.plot,
        movie.poster,
        movie.rating,

    ]);

    conn.query(sql,(err,result)=>{
        if (err) throw err;
        res
          .status(201)
          .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});



//delete
router.delete("/:id",(req,res)=>{
    const id = req.params.id;
    let sql = "DELETE FROM `movies` WHERE movieId = ?"

    conn.query(sql,[id],(err,result)=>{
        if (err) throw err;
        res
          .status(201)
          .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
});