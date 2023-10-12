const express = require('express');
const puppeteer = require('puppeteer');
const scraperObj = require('./scraper');
const cors = require('cors')

const app = express();

app.get('/scrape', async (req, res) => {

    const { url } = req.query;
    
    if (!url) {
      return res.status(400).send('Please provide a URL to scrape');
    }  

    const data = await scraperObj.scraper(url)
    
    //console.log(data)

    res.status(200).json({

        data

    });

});

app.use(cors())

app.use(express.static('public'))

app.listen(3000, () => {

    console.log('Server running on port 3000');

});
