var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
const mkdirp = require('mkdirp')
app.use(cors())

var storage = multer.diskStorage({
    destination: function (req, file, cb) {

    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, "filetomove" )
  }
})
var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
    console.log('Api got the call');
upload(req, res, function (err) {
      var fs = require('fs');
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }  


           if(req.body.type === "audio")
           {
            var dir = "public/Music/"+req.body.artistName+"/"+req.body.albumName
            var ext = "/"+req.body.songid+".mp3"
           }
           if(req.body.type === "album")
           {
            var dir = "public/Music/"+req.body.artistName+"/"+req.body.albumName
            var ext = "/"+req.body.albumName+".jpg"
           }
           if(req.body.type === "profile")
           {
            var dir = "public/Pfp"
            var ext ="/"+req.body.artistName+".jpg"
           }
          

           if(!fs.existsSync(dir  ))
           {
             fs.mkdirSync(dir, { recursive: true }  )
           }
           fs.rename("public/filetomove", dir+ext,function (err) {
            if (err) throw err
            console.log('Successfully renamed - AKA moved!')
          })
      return res.status(200).send(req.file)

    })

});

app.listen(8000, function() {

    console.log('App running on port 8000');

});
