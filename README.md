
# WSA Scraper

Web scraping service that scrapes the following URL and returns the
scraped data in JSON format.

https://wsa-test.vercel.app/


## Documentation

Created an API that queries an URL and scrapes all the data from the content that it receives as a response. The service uses an endpoint that requests the query of our URL and if the request succedes(the HTTP 200 OK success status response is sent back)
, it will scrape all the data it can get from the content and will return it in JSON format. To make it work, first you have to navigate to the root directory and start the server by running the command "node index.js",then you will navigate to http://localhost:3000/, paste the WSA site URL in the input field and press the Scrape button. The service scrapes for titles, links, images and text. It also analizes text and categorizes it based on the sentiment it gives off.
After returing all the data in JSON format, the service also offers the links of all the images for further use by the user(downloading, analyzing, etc..).

## Run Locally

Clone the project

```bash
  git clone https://github.com/bicaandrei/Web-Scraper.git
```

Go to the project directory

```bash
  cd Web-scraper
```

Install dependencies

```bash
  npm install pupetter
  npm install express
  npm install cors
  npm install word-count
```

Start the server

```bash
  node index.js
```


## Lessons Learned

What did you learn while building this project?

I've learned so much in such a short period of time, I started working on the project about 24 hours ago. It has been my first time creating a REST Api or using Node.js but I worked tirelessly and proved myself that I can learn how to use any new technology if I wanted to. I have great passion for learning new things and I'm able to dedicate all my efforts towards achieving a goal that I set for myself. I loved every minute of coding that I spent on this project(the proof is the fact that it's 6:58 AM at the time that I'm writing this). It has been a great journey, particularly because I had to reach very far out of my comfort zone, but also because I got to understand just how much I love developing Web services using a Linux OS. I faced a lot of challenges but by having great logical thinking and a powerful will, I mananged to overcome every single one. No matter the outcome, the developing of this service has been an incredible spend of time.
## Support

For support, email bica.nuna@gmail.com


## Authors

- Bica Andrei-Ionut

