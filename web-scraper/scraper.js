const express = require('express');
const puppeteer = require('puppeteer');
const wordCount = require("word-count")
const sentimentAnalysis = require("./sentiment-analysis");
const { type } = require('express/lib/response');

const removeDuplicates = (arr) => { 
 
    /*
    Function for eliminating duplicates in an array.
    @param {object}: arr [array of URLs] 
    @return {object}: filtered array of URLs without duplicates
    */

    return arr.filter((item, index) => arr.indexOf(item) === index); 
       

} 

const getLinkFromElement = async (element) => {

    /*
    Function that fetches the href property of an object and returns it
    @param {object}: element [body of a web page]
    @return {string}: URL of web page as a string
    */

    try{
     
        const link = await (await element.getProperty('href')).jsonValue()
        return link
    
    }
    catch(e){

        console.log(e)

    }

}

const getAllLinks = async (linkElements) => {

    /*
    Function that returns an array of all the URLs contained in the web page.
    @param {object}: linkElements [array of web page objects]
    @return {object}: array of URLs as strings
    */

    try{
    
        var allLinks = []
        for (const linkElement of linkElements){

           let element = await linkElement
           let link = await getLinkFromElement(element)
           allLinks.push(link)

        }
    
        return allLinks

    }
    catch(e){

        console.log

    }

}   

const scraperObject = {
    
    async scraper(url){

        /*
        Using the pupetteer module, the scraper function launches a web page using the url
        transmited as a parameter and runs a query selector that fetches the web pages of all the articles. 
        @param {string}: url [url of the main page]
        @return {object}: list of dictionaries with the scraped content of each article
        */

        const browser = await puppeteer.launch();
        const page = await browser.newPage();  
        await page.goto(url); 
        const linkElements = await page.$$("a")
        links = await getAllLinks(linkElements)
        links = removeDuplicates(links)

        const getShortDescription = async(url, title) => {

            /*
            Function that returns the short description of an article.
            Ideated a function that extracts the text of each div class from the main web page, searches
            for the article's title (contained in the second parameter) and returns the text
            that comes in the next div class, that being the short description of the article.
            @param {string}: url [url of the article]
            @param {string}: title [title of the article]
            @return {string}: short description of the article
            */


            try{
            
                await page.goto(url)
                const headings = await page.$$("div")
                let headingText = ""
                found = false
                for(const heading of headings){

                    const element = heading
                    headingText = await page.evaluate(element => element.textContent, element);
                    const compareStringValue = headingText.localeCompare(title)
                    if (compareStringValue == 0){

                        found = true
                        continue

                    }
                    if(found){

                        return headingText

                    }

                }
            }
            catch(e){

                console.log(e)

            }

        }

        const scrapeCurrentPage = async(url) => {

            /*
            Function that returns a dictionary with the scraped content of a web page, using it's URL.
            Designed a function that extracts the title, the image link and url of an article and 
            puts them in a dictionary.It also adds the sentiment of the article, as well as the 
            word count and returns the dictionary.
            @param {string}: url [url of the article]
            @return {object}: dictionary with all the scraped content 
            */

            try{
            
                data = {}
                await page.goto(url)

                const title = await page.title()
                const removefromTitle = title.replace(" - WSA Test", '')
                data["title"] = removefromTitle
                
                const img = await page.$$eval('img[src]', imgs => imgs.map(img => img.getAttribute('src')));
                let imgLink = "https://wsa-test.vercel.app" + img[0]
                data["image"] = imgLink
                
                data["href"] = url
            
                const extractedText = await page.$eval('*', (el) => el.innerText);
                const sentiment = await sentimentAnalysis.sentiment(extractedText)
            
                if(sentiment == 0)
                    data["sentiment"] = "positive"
                else if(sentiment == 1)
                    data["sentiment"] = "neutral"
                else 
                    data["sentiment"] = "negative"
                
                const count = wordCount(extractedText)
                data["words"] = count

                return data
            
            }
            catch(e){

                console.log(e)

            }

        }

        const scrapeAll = async() => {

            /*
            Function that loops through the links of all the articles contained in the main page,
            receives dictionaries with the scraped content of each one, and appends every dictionary
            to a list.
            @return {object}: list of dictionaries with the scraped content of each article

            */

            try{
            
                let scrapedData = [];

                for(const link of links){

                    urlData = {}
                    
                    const urlScrapedData = await scrapeCurrentPage(link)
                    const description = await getShortDescription(url, urlScrapedData["title"]);
                    
                    urlData["title"] = urlScrapedData["title"]
                    urlData["short_description"] = description
                    urlData["image"] = urlScrapedData["image"]
                    urlData["href"] = urlScrapedData["href"]
                    urlData["sentiment"] = urlScrapedData["sentiment"]
                    urlData["words"] = urlScrapedData["words"]
                    
                    scrapedData.push(

                        urlData

                    )

                }

                return scrapedData

            }
            catch(e){

                console.log(e)

            }

        }

        try{
         
            const scrapedData = await scrapeAll();
            return scrapedData

        }
        catch(e){

            console.log(e)

        }

        await browser.close();
    }
}

module.exports = scraperObject