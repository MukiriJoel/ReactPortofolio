const express =require('express');
const bodyParser=require('body-parser');
const cors=require("cors");
const app=express();
const mysql=require('mysql2');


const db=mysql.createPool({
host:"localhost",
port:"3307",
user:"joel",
password:"Mysql12742;,.",
database:"portofolio"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send("Hello Joe");
});

app.post('/insert',(req,res)=>{
    const data=req.body;
    const projName=JSON.parse(Object.keys(data)[0]).projName;
    const projLink=JSON.parse(Object.keys(data)[0]).projLink;
    const projDesc=JSON.parse(Object.keys(data)[0]).projDesc;
    const projImg=JSON.parse(Object.keys(data)[0]).projImg;
    const sqlInsert="INSERT INTO projects (proj_name,proj_link,proj_desc,proj_img) VALUES (?,?,?,?)";
    db.query(sqlInsert,[projName,projLink,projDesc,'img/'+projImg],(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
});

app.get('/get',(req,res)=>{
    const sqlSelect="SELECT * FROM projects ORDER BY id DESC";
    db.query(sqlSelect,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            console.log(result);
            res.send(result);
        }
    });
});



app.listen(3001,()=>{
    console.log("Running on port 3001");
});