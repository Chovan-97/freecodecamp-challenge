import React, {useEffect, useState} from 'react';
import './App.css';
import COLORS_ARRAY from './colorsArrays.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

let quotesDBurl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const [quote, setQuote] = useState("Dreaming, after all, is a form of planning.");
  const [author, setAuthor] = useState("Gloria Steinem");
  const [quotesArray, setQuotesArray] = useState(null);
  let [randomNumber, setRandomNumber] = useState(0);
  const [accentColor, setAccentColor] = useState("#1AFF33");

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON.quotes);
  }

  useEffect(() => {
    fetchQuotes(quotesDBurl);
  });

  const getRandomQuote = () => {
    randomNumber = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomNumber);
    setQuote(quotesArray[randomNumber].quote);
    setAuthor(quotesArray[randomNumber].author);
    setAccentColor(COLORS_ARRAY[Math.floor(COLORS_ARRAY.length * Math.random())]);
  }

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
      <div id='quote-box' style={{color: accentColor}}>
          <h2 id='text'><span id='quote-icon'><FontAwesomeIcon icon={faQuoteLeft}/></span>{quote}"</h2>
          <p id='author'>- {author}</p>
          <div className='buttons'>
            <a id='tweet-quote' style={{backgroundColor: accentColor}} href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`)}><FontAwesomeIcon icon={faTwitter} className="twitter-icon" /></a>
            <button id='new-quote' style={{backgroundColor: accentColor}} onClick={() => getRandomQuote()}>New quote</button>
          </div>
        </div>
        <p className='creator'>By Josesky</p>
      </header>
    </div>
  );
}


export default App;
