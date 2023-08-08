const express=require('express');
const Jwt=require('jsonwebtoken');
const jwtkey='e-comm';
const cors=require("cors")
require('./db/config');
const User=require("./db/User");
const Product=require("./db/product")
const app=express(); //making fn executable
//making route
app.use(express.json());
app.use(cors());
//middleware is used to control the post 
//here we have successfully gotta the data from postman to nodejs then we saved to data frpm postman to mongodb
app.post("/register",async (req,resp)=>{
    let user=new User(req.body);
    let result=await user.save();
    result=result.toObject();
    delete result.password;
    Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=> {
        if(err) {
            resp.send({result:"something went wrong,please try after some time"})
        }
        resp.send({result, auth:token});
    })
})
app.post("/login",async (req,resp)=>{
    console.log(req.body);
    if(req.body.password && req.body.email) {
        let user=await User.findOne(req.body).select("-password");//for removing pw
        if(user) {
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=> {
                if(err) {
                    resp.send({result:"something went wrong,please try after some time"})
                }
                resp.send({user, auth:token});
            })
           
        }
        else {
            resp.send({result:'No User Found'});
        }
    }
    else {
        resp.send({result:'No User Found'});
    }
})
app.post("/add-product",verifytoken,async (req,resp)=>{
//when we enter in database promise gets return so we make async fn
let product= new Product(req.body);
let result=await product.save();
resp.send(result);
});
app.get("/products",async(req,resp)=>{
    let products=await Product.find();
    if(products.length>0) {
        resp.send(products);
    } else {
        resp.send({result:"No Products Found"})
    }
});
app.delete("/product/:id",async (req,resp)=>{
   
    const result=await Product.deleteOne({_id:req.params.id})
    resp.send(result);
});
app.get('/product/:id',async (req,resp)=> {
    let result=await Product.findOne({_id: req.params.id});
    if(result) {
        resp.send(result);
    } 
    else {
        resp.send({result:"No Record Found"})
    }
})
app.put("/product/:id" ,async(req,resp)=> {
let result = await Product.updateOne(
    {_id: req.params.id},
    {
        $set: req.body
    }
)
resp.send(result);
});
app.get("/search/:key",verifytoken,async(req,resp)=> {
    //verify token ki vjah se search api load hee hoti rhegi
    // agge process krne ke liye  agar main isse next krdugi toh isse api mein 
    // le jayega
let result=await Product.find({
    "$or": [
        {name:{$regex:req.params.key}},
        {company:{$regex:req.params.key}},
        {category:{$regex:req.params.key}},
        {price:{$regex:req.params.key}}
    ]
    
});
resp.send(result);

})
function verifytoken(req,resp,next) {
    let token=req.headers['authorization'];  //key name-authorization
    if(token)  {
        token=token.split(' ')[1];
        Jwt.verify(token,jwtkey,(err,valid)=>{
       if(err) {
     resp.status(401).send({result: "please provide valid token"})
       } else {
      next();
       }

        })
    }
    else {
          resp.status(403).status(403).send({result : "please add token with header"})
    }

// next(); //next krne se verify token ko api pe le jayega
//send krne se data de dega
}
app.listen(5000);