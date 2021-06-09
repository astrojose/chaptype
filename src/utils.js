let quotes = require('./data/greats.json')

const getQuote = () =>{
  let  quote = quotes[Math.floor(Math.random() * quotes.length)]
  return quote 
} 



export {getQuote}
