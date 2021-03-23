import React from 'react'

import Quote from './quote.js'


const MainGame = () => {
    let [windex, setWindex] = React.useState(0)
    let [errors,setErrors]= React.useState([])
    let [start, setStart]=React.useState()
    let [end, setEnd]=React.useState()
    let [isTyping, setIsTyping] = React.useState(true) 

    React.useEffect(() => {
        let wordNodes = document.querySelector(".quoteText").childNodes
        if (windex <= wordNodes.length){
            wordNodes.item(windex).className="curr"
        }

    },[windex]);

    let parag = "people are frugal in guarding their"
    
    let getWpm = () => {
        let words = windex + 1
        let durr = (end - start)/1000/60
        let errWords = [...new Set(errors)].length
        console.log(words)
        console.log(errWords)
        console.log(durr) 
        return ((words-errWords)/durr).toFixed()
    }

    let getErrors = () => {return [...new Set(errors)].length}

    let handleInput = (e) => {
        let arrQuote = parag.split(" ")
        // if (windex == 0 && e.target.value != '') {
        
        // }
        if (e.target.value.length == 1 && windex == 0) {
            console.log("SHIT STARTED")
            let time1 = new Date()
            setStart(time1.getTime())
        }
        if(!(e.target.value).endsWith(' ')){
            console.log(windex)
            console.log(arrQuote[windex])
            
            if(arrQuote[windex].startsWith((e.target.value).trim()))
            {
                console.log(e.target.value)
                console.log("is valid")
            }
            else {
                console.log("shit is wrong")
                // setSearches(searches => [...searches, query])
                setErrors(errors => [...errors, windex]);
            }
        } 
        // if((e.target.value).trim() == ''){
        //         e.target.value = ''
        //     }

        else {
            console.log("the space is here")
            // [...new Set(array)]; --> skip dupes
            console.log([...new Set(errors)])
            e.target.value = ''
            let wordNodes = document.querySelector(".quoteText").childNodes
            wordNodes.item(windex).className="done"
            if (windex < arrQuote.length-1) {
                console.log(windex)
                console.log(arrQuote.length)
                setWindex(windex+1)   
            } 

            if (windex == arrQuote.length-1) {
                let time2 = new Date()
                setEnd(time2.getTime())
                setIsTyping(false)
            }
        }
    }
        let typing = (
            <div className="typing">
                <Quote data={parag} wordInd={windex}/>
                <div className="current">
                    <div className="input">
                        <input name="typed"
                            placeholder="Type the above text here ..."
                            autoFocus
                            onInput={ handleInput }
                            />
                        <div className="actions">
                            <button>Restart</button>
                        </div>
                    </div>
                    <div className="status"> </div>
                </div>
            </div>
        )

        let result = (
        <div className="welcome">
         <p>Speed: {getWpm()} wpm</p>

         <p> Errors : {getErrors()} words</p>
            <p>Above is your score</p>
            <div className="cta">
                <button onClick={()=>{window.location = '/type'}}>play again</button>
            </div>
        </div>
        )

    return (
        <content>
            {(!isTyping) ? result : typing}
        </content>
    )
}

export default MainGame
