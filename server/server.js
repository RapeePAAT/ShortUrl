const express = require('express')
const shortid = require('shortid')
const app = express();
const db = require('./model/db')
const port = 5000;
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())

app.use(cors())

app.post('/api/creat-short-url',async (req,res)=>{
    const originalURL = await req.body.originalURL;
    const shortURL = await shortid.generate();

    try{
        const checkData = await db.query("SELECT orginal_url FROM public.url WHERE  orginal_url=$1",[originalURL])

        if(checkData.rows.length>0){
            const UpadateShort = await db.query("UPDATE public.url SET short_url=$1 WHERE orginal_url=$2",[shortURL,originalURL])
            res.status(200).json(UpadateShort)
            console.log("UpDate Complete");
        }else{
            const getUrl = await db.query("INSERT INTO public.url (orginal_url, short_url, click) VALUES ($1,$2,0);",[originalURL,shortURL])
            console.log("Creat Complete")
            res.status(200).json(getUrl) 
        }
            
    }catch(e){
        console.log(e)
        res.status(401).json({mag : error})
    }
    
    

});
app.get("/api/get-all-url", async (req,res)=>{
    try{
         const find = await db.query("SELECT * FROM public.url")
         if(find.rows.length > 0){
            res.status(200).json(find.rows);
         }
         else{
            res.status(500).json({
                Status :"Not ok ",
                message:"something went wrong"
            })
         }
    }
    catch(e){
        console.log(e)
        res.status(401).json({mag : error})
    }
    
})
app.get("/:shortURL", async (req, res) => {
    const {shortURL} = await req.params;
    console.log(shortURL)
    try {
        const result = await db.query("SELECT orginal_url FROM public.url WHERE short_url=$1",[shortURL])
        //const upDate = await db.query("UPDATE public.url SET click = click + 1 WHERE short_url = $1",[shortURL])
            if(result.rows.length > 0){
                const originWebsite = await result.rows[0].orginal_url
                res.redirect(originWebsite)
            }
    }
    catch(error){
        console.log(error)
        res.status(401).json({mag : error})
    }
});
app.put("/update/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await db.query("SELECT * FROM public.url WHERE id = $1", [id]);
        
      if (result.rows.length > 0) {
        const updateResult = await db.query("UPDATE public.url SET click = click + 1 WHERE id = $1", [id]);
        res.status(200).json({ message: "URL updated successfully" });
      } else {
        res.status(404).json({ message: "URL not found" });
      }
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

app.listen(port,()=>{
    console.log('Server is running on port '+port)
})
