const list = require("./data/words.json");

/**
 * Generate an swahili of words
 *
 * @param Integer word_count
 * @return Array|String
 */
function swahili(word_count=1) {
  this.random = function() {
    if (word_count === 1) {
      const word = list[Math.floor(Math.random() * list.length)];
      return word.sw;
    } else {
      const words = [];
      for (let i = 1; i < word_count; i++) {
        const word = list[Math.floor(Math.random() * list.length)];
        words.push(word);
      }
      return words;
    }
  };

  this.paragraph = function(){
    let  words = '';
    for (let i = 1; i <= word_count; i++) {
      const word = list[Math.floor(Math.random() * list.length)];
      words += word.sw + ' '
    }
    return words.trim();
  }
  
  this.randArray = function(){
    const words = [];
    for (let i = 1; i < word_count; i++) {
      const word = list[Math.floor(Math.random() * list.length)];
      words.push(word.sw);
    }
    return words;
  }
}

module.exports = swahili;
