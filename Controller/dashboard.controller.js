const db = require('../DBconnector/sqlit3_sequelize')
const bycrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path = require("path");
const auth = require("../Middleware/auth")
const fetch = require("node-fetch")
// const IPFS = require('ipfs')

async function main(req,res,next) {
  res.render('index',{greeting: "hello"});
}

async function login_form(req,res,next) {
  const username = req.body.email
  const password = req.body.password

  const response = await fetch('http://127.0.0.1:8000/account/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: "email=dsf@gmail.com&password=123456789"
  })
  //...
  // Extract the JWT from the response
  const jwt_token =await  response.headers.get('auth-token')
  //...
  // Do something the token in the login method
  // await login({ jwt_token })
  res.cookie('token', jwt_token)
  // req.session.auth-token = jwt_token;
  // res.redirect('/account/api/user');
  res.redirect('/');
}

//Login Controller
async function login(req,res,next){
  res.render('login');
}

// contract 
async function contract(req,res,next){
  res.render('content/contract', {title:"hello"});
}

var storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 

      // Uploads is the Upload_folder_name 
      cb(null, "uploads") 
  }, 
  filename: function (req, file, cb) { 
    cb(null, file.fieldname + "-" + Date.now()+".jpg") 
  } 
}) 
     
// Define the maximum size for uploading 
// picture i.e. 1 MB. it is optional 
const maxSize = 1 * 1000 * 1000; 
  
var upload = multer({  
  storage: storage, 
  limits: { fileSize: maxSize }, 
  fileFilter: function (req, file, cb){ 
  
      // Set the filetypes, it is optional 
      var filetypes = /jpeg|jpg|png/; 
      var mimetype = filetypes.test(file.mimetype); 

      var extname = filetypes.test(path.extname( 
                  file.originalname).toLowerCase()); 
      
      if (mimetype && extname) { 
          return cb(null, true); 
      } 
    
      cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes); 
    }  

// mypic is the name of file attribute 
}).single("mypic");        

async function upload_files (req, res, next) { 
        
  // Error MiddleWare for multer file upload, so if any 
  // error occurs, the image would not be uploaded! 
  upload(req,res,function(err) { 

      if(err) { 

          // ERROR occured (here it can be occured due 
          // to uploading image of size greater than 
          // 1MB or uploading different file type) 
          res.send(err) 
      } 
      else { 

          // SUCCESS, image successfully uploaded 
          res.send("Success, Image uploaded!") 
      } 
  }) 
}



// async function main () {
//   const node = await IPFS.create({silent: true})

//   const filesAdded = await node.add({
//     path: 'hello.txt',
//     content: Buffer.from('Hello World 101')
//   })

//   const fileBuffer = await node.cat(filesAdded[0].hash)

//   console.log('Added file contents:', fileBuffer.toString())

// }



module.exports = {
  main,
  login,
  login_form,
  upload_files,
  contract
}