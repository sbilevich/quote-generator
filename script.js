const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function loading() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

async function getQuotes(apiURL) {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
}

function newQuote() {
    loading()
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    if (quote.text.length > 100) {
        quoteText.classList.add('long-qoute')
    } else {
        quoteText.classList.remove('long-qoute')
    }
    quoteText.textContent = quote.text;

    if (!quote.author) {
        quoteAuthor.textContent = 'Unknown'
    } else {
        quoteAuthor.textContent = quote.author
    }
    complete();
}
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blanc')
}
twitterBtn.addEventListener('click', tweetQuote)
newQuoteBtn.addEventListener('click', newQuote)
getQuotes('https://type.fit/api/quotes')