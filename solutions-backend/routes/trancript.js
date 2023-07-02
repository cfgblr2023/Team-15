const AWS = require("aws-sdk");
const { Deepgram } = require("@deepgram/sdk");
const axios = require('axios');
const { Router } = require("express");
const express = require("express");
const router = express.Router();
router.post('/', async (req, res) => {
    try {
      const url = req.body.url;
      const deepgram = new Deepgram('');
      const fileSource = { url: url };
      const response = await deepgram.transcription.preRecorded(fileSource, {
        punctuate: true,
        detect_topics: true,
      });
  
      const transcript = response.results.channels[0].alternatives[0].transcript;
  
      // Split the transcript into individual words
      const words = transcript.split(' ');
  
      // Filter out common words or stopwords
      const stopwords = [
        'a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'so', 'yet',
        'at', 'by', 'from', 'in', 'into', 'of', 'off', 'on', 'onto', 'out',
        'over', 'to', 'up', 'with', 'as', 'once', 'about', 'above', 'after',
        'along', 'amid', 'among', 'around', 'as', 'before', 'behind',
        'below', 'beneath', 'beside', 'between', 'beyond', 'during', 'except',
        'following', 'in', 'inside', 'like', 'minus', 'near', 'of', 'on',
        'opposite', 'outside', 'past', 'per', 'plus', 'regarding', 'round',
        'save', 'since', 'than', 'through', 'throughout', 'to', 'toward',
        'under', 'underneath', 'unlike', 'until', 'unto', 'upon', 'versus',
        'via', 'within', 'without',
        'aboard', 'about', 'above', 'absent', 'across', 'after', 'against',
        'along', 'alongside', 'amid', 'among', 'around', 'as', 'aside',
        'astride', 'at', 'athwart', 'before', 'behind', 'below', 'beneath',
        'beside', 'between', 'beyond', 'by', 'circa', 'concerning', 'considering',
        'despite', 'down', 'during', 'except', 'failing', 'following', 'for',
        'from', 'in', 'including', 'inside', 'into', 'like', 'mid', 'minus',
        'near', 'next', 'notwithstanding', 'of', 'off', 'on', 'onto', 'opposite',
        'out', 'outside', 'over', 'past', 'per', 'plus', 'regarding', 'round',
        'save', 'since', 'through', 'throughout', 'till', 'times', 'to', 'toward',
        'under', 'underneath', 'unlike', 'until', 'unto', 'up', 'upon', 'via',
        'with', 'within', 'without', 'worth',
        'accordingly', 'almost', 'also', 'anyway', 'basically', 'certainly',
        'consequently', 'conversely', 'e.g.', 'effectively', 'evidently',
        'exactly', 'e.g.', 'equally', 'essentially', 'finally', 'further',
        'furthermore', 'generally', 'hence', 'however', 'i.e.', 'inasmuch',
        'incidentally', 'indeed', 'instead', 'lest', 'likewise', 'meanwhile',
        'moreover', 'namely', 'nevertheless', 'nonetheless', 'notably',
        'obviously', 'otherwise', 'particularly', 'precisely', 'regardless',
        'secondly', 'significantly', 'similarly', 'since', 'specifically',
        'still', 'subsequently', 'then', 'therefore', 'thereupon', 'thus',
        'undoubtedly', 'whereas', 'yet',
        'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
        'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'will', 'would',
        'shall', 'should', 'can', 'could', 'may', 'might', 'must', 'ought',
        'need', 'dare', 'used', 'be', 'is', 'am', 'are', 'was', 'were', 'being',
        'been', 'have', 'has', 'had', 'do', 'does', 'did', 'doing', 'will',
        'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must',
        'ought', 'need', 'dare', 'used', 'this', 'our', 'see',
      ];
      const filteredWords = words.filter(word => !stopwords.includes(word.toLowerCase()));
  
      // Extract the important keywords
      const keywords = filteredWords.filter((word, index) => {
        const confidence = response.results.channels[0].alternatives[0].words[index].confidence;
        const isPunctuation = !word.match(/[a-zA-Z]/);
        // Adjust the confidence threshold as per your requirement
        return confidence > 0.9 && !isPunctuation;
      });
  
      // Get the data for each keyword
      const keywordData = keywords.map((keyword, index) => {
        const confidence = response.results.channels[0].alternatives[0].words[index].confidence;
        const startTime = response.results.channels[0].alternatives[0].words[index].start;
        const endTime = response.results.channels[0].alternatives[0].words[index].end;
        return {
          keyword: keyword,
          confidence: confidence,
          startTime: startTime,
          endTime: endTime
        };
      });
  
    // Function to search for images on Pixabay
async function searchPixabayImages(keyword) {
    const apiKey = '';
    const searchUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(keyword)}&image_type=photo`;
  
    try {
      const response = await axios.get(searchUrl);
      const hits = response.data.hits;
      if (Array.isArray(hits) && hits.length > 0) {
        const firstHit = hits[0];
        return firstHit.webformatURL;
      }
      return null;
    } catch (error) {
      console.error('Error searching for images on Pixabay:', error);
      return null;
    }
  }
  
  // Use the keywordData array to search for images on Pixabay
const keywordImages = await Promise.all(keywordData.map(async (keywordData) => {
    const keyword = keywordData.keyword;
    const start = keywordData.startTime;
    const end = keywordData.endTime;
    const image = await searchPixabayImages(keyword);
    return { keyword, image: image || 'https://general-site-bucket.s3.ap-south-1.amazonaws.com/Bigbuddy+Logo.png', start, end }; // Use a default image URL if image is null
  }));
      res.send({
        transcription: response,
        keywordImages: keywordImages,
      });
    } catch (err) {
      res.send(err);
    }
});
  

module.exports = router;