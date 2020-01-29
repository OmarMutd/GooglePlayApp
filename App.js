const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const playstore = require("./playstore-data.js");

app.use(morgan('common')); 
app.use(cors());


app.get('/apps', (req, res) => {
    const { genre = "", sort} = req.query;
    
    if (sort) {
        if (!['Rating', 'App'].includes(sort)) {
            return res
            .status(400)
            .send('Sort must be one of Rating or App');
        }
    }


    let results =  [...playstore]
        

        if (sort) {
            results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;

            });
        }
        if (genre) {
            results = results.filter(value => value.Genres.toLowerCase() === genre.toLowerCase() ) 
        }
    
    res.json(results);
    
  });
    


module.exports = app;
