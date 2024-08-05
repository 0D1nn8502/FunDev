import express from "express";
import bodyParser from "body-parser"; 
import axios from "axios"; 
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));   Apparently for when hosting on web 

const app = express();
const port = 3000;

// News api key 

const apikey = 'c513fa3777aa4e3b8ca95e3c365e44a1'; 

app.use(express.static("public"));
app.use(bodyParser.urlencoded ({ extended:true }));


app.get("/", async (req, res) => {

    // Getting current time in IST // 

    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    // ISTTime now represents the time in IST coordinates
    var hoursIST = ISTTime.getHours(); 
    var minutesIST = ISTTime.getMinutes(); 
    var time_now = hoursIST + ":" + minutesIST; 
    //                          //   
    
    // Get some news // 

    var essentials = 'https://newsapi.org/v2/top-headlines?pageSize=30&sources=reuters&apiKey=' + apikey;  
    var desi = 'https://newsapi.org/v2/everything?country=in&apiKey=' + apikey;  


    try {

        const response = await (axios.get(essentials));   
        const info = response.data.articles; 

        // creates a new array of articles from the recieved api array 
        const articlez = info.map(article=> ({

            title : info.title, 
            url : info.url, 
            description : info.description

        }));

        res.render("post.ejs", { taem: time_now, articlez: articlez });

    } catch (error) {
        console.log(error); 
    }

});


app.get("/write", (req, res) => {

    res.render("writemode.ejs"); 

}); 


app.post("/post", (req, res) => {



});


app.listen(port, () => {

    console.log("Listening on port " + port);

});