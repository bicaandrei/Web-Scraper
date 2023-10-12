const analySisObj = {


      async sentiment(text){

        /*
        Function that analizes the sentiment of an article.
        Ideated an algorithm that analizes the sentiment of an article based
        on the frequency of words that are considered positive, neutral and negative.
        The algorithm lowercases every letter in the text, eliminates common words, expressions
        and non-alphanumeric that appear in each article, trims the text and splits it by whitespaces.
        It then increments the frequencies off all the words contained in the three categories and sums up
        the frequencies off all the words from the same category. It compares the three sums, selects
        the biggest one and returns 0 if the overall sentiment is positive, 1 if the overall sentiment is neutral
        and 2 if it is negative.
        @param {string}: text [text contained in an article]
        @return {number}: {
            
            0 if the sentiment is positive,
            1 if the sentiment is neutral, 
            2 if the sentiment is negative
        
            }
        */

        positiveWords = {

            "positive": 0, 
            "joyful": 0,
            "beautiful": 0,
            "peace": 0,
            "magnificent": 0,
            "vibrant": 0,
            "happines": 0


        }

        neutralWords = {

            "neutral": 0,
            "neutrality": 0,
            "neither": 0,
            "nor": 0,


        }

        negativeWords = {

            "downside": 0,
            "downsides": 0,
            "negatively": 0,
            "negative": 0,
            "affect": 0,
            "stress": 0,
            "stresses": 0,
            "distress": 0,
            "disappointing": 0,
            "issues": 0,
            "pollution": 0

        }

        let loweredText = text.toLowerCase()
        let textWithoutCommon = loweredText.replace("is", '')
        textWithoutCommon = loweredText.replace("the", '')
        textWithoutCommon = loweredText.replace("and", '')
        textWithoutCommon = loweredText.replace("Back to Articles")
        textWithoutCommon = textWithoutCommon.replace(/[^a-zA-Z0-9 ]/g, "")
        textWithoutCommon = textWithoutCommon.trim()
        const splitText = textWithoutCommon.split(" ")

        for(const word of splitText){

            if(Object.keys(positiveWords).includes(word)){

               positiveWords[word] += 1

            }
            if(Object.keys(neutralWords).includes(word)){

               neutralWords[word] += 1
 
            }
            if(Object.keys(negativeWords).includes(word)){

               negativeWords[word] += 1
 
            }

        }

        const positiveValues = Object.values(positiveWords);

        const positiveSum = positiveValues.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);

        const neutralValues = Object.values(neutralWords);

        const neutralSum = neutralValues.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);

        const negativeValues = Object.values(negativeWords);

        const negativeSum = negativeValues.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);

        let maxSum = Math.max(positiveSum, neutralSum)
        maxSum = Math.max(maxSum, negativeSum)

        if(positiveSum == maxSum)
           return 0
        else if(neutralSum == maxSum)
           return 1
        else
           return 2

      }

    

}

module.exports = analySisObj