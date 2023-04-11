const quote = document.querySelector("span");
const author = document.querySelector("p");
const tweet = document.getElementById("tweet");
const newQuote = document.getElementById("new_quote");
const leftQuote = document.querySelector("i");
const a = document.querySelector("a");
const loader = document.querySelector(".loader");
const quoteContainer = document.getElementById("quote-container");

let quotesList = [];

function loadingStart() {
  loader.classList.remove("hide");
  quoteContainer.classList.add("hide");
}

function loadingEnd() {
  loader.classList.add("hide");
  quoteContainer.classList.remove("hide");
}
function printQuotes() {
  let count = Math.floor(Math.random() * quotesList.length);
  quote.textContent = quotesList[count].text;
  author.textContent = quotesList[count].author || "Unknown";

  if (quote.textContent.length > 60) {
    quote.style.fontSize = "2rem";
    leftQuote.style.fontSize = "3rem";
  } else {
    quote.style.fontSize = "2.75rem";
    leftQuote.style.fontSize = "4rem";
  }

  a.href = `https://twitter.com/intent/tweet?text=${quote.textContent} "${author.textContent}"`;
}
async function getQuotes() {
  loadingStart();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Not found");
    }
    quotesList = await response.json();
    printQuotes();
    loadingEnd();
  } catch (error) {
    console.log(Error.message);
  }
}
getQuotes();

newQuote.addEventListener("click", printQuotes);
