const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Global so we can use in any function
let apiQuotes = [];

// Show Loading
function loading() {
    // hidden available on aby html element
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote
function newQuote() {
    loading();
    // To pick a random quote from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote);
    // console.log(quote);
    // Check if author filed is null/blank and replace it with 'unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determinate the styling
    console.log(quote.text.length);
    if (quote.text.length > 20) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    } 
    // Set quote and hide loader
    // Value still needed only affected the styling
    quoteText.textContent = quote.text;
    complete();
}

// Get quotes from API
// async functions can run at anytime independently so it won't stop the browser from completing the loading of a page
async function getQuotes() {
    // Call loading
    loading();
    // const - link value will never change
    const apiUrl = 'https://type.fit/api/quotes';
    // a try - catch allows us to attempt to complete a fetch request
    // if it does not work we can catch the error information and do something with it
    try {
        // async await so we don't populate the response const with undefined
        const resposnse = await fetch(apiUrl);
        // Convert to json object, initial reponse is a series of strings
        apiQuotes = await resposnse.json();
        new newQuote();
        // array of objects
        // console.log(typeof apiQuotes)
        // random value from array of objects
        // console.log(apiQuotes[12])
    } catch(error) {
        // catch error here
        
    }
}
// To tweet quote
function tweetQuote() {
    // Template string allows us to pass in a variable
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();


