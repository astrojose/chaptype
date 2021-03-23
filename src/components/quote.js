import React from 'react'

const Quote = (props) => {
    
    let splitQuote = (quote) => {
        let arrQuote = quote.split(" ")
        return arrQuote.map( (word,index) => ( <span wordind={index}> { word } </span>))
    }

    return (
        <div className="quote">
            <p className="quoteText">
                {splitQuote(props.data)}   
            </p>
        </div>
        )
}

export default Quote