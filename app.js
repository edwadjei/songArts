var express = require('express'),
    app     = express(),
    fetch   = require('node-fetch'),
    port=3000;

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname +'/public'));
app.use(getTracksMiddleware);

app.get('/', (req, res)=>{
    var url="https://api.deezer.com/playlist/1313621735/?index=0&limit=3&output=json";
    getTracks(url,"home","error")
     
})

app.get('/search', (req, res)=>{
    var term= req.query.q,
        index=req.query.index;
    if(!term){
        res.redirect("/")
    }if(!index){
        index=0
    }
    var url="https://api.deezer.com/search?q="+term+"&limit=12&output=json"+"&index="+index;
        getTracks(url,"search","error");
})

app.listen(port, function(){
    console.log("\x1b[32m%s\x1b[0m", "songArts is running on PORT: "+port)
})

function getTracksMiddleware(req, res, next){
    getTracks = function(url, successPath, failPath){
        fetch(url)
        .then(function(resp){
            if(resp.ok){
                return resp.json()
            }
        }).then((data)=>{
            var tracks=data
            res.render(successPath,{tracks: tracks, term: req.query.q})
        }).catch((err)=>{
            res.render(failPath, {err: err})
        })
    }
    next();
}