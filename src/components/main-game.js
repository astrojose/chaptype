import React from 'react'

import Quote from './quote.js'


const MainGame = (props) => {
    let [windex, setWindex] = React.useState(0)
    let [errors,setErrors]= React.useState([])
    let [start, setStart]=React.useState()
    let [end, setEnd]=React.useState()
    let [isTyping, setIsTyping] = React.useState(true)
    let [timer, setTimer] = React.useState('00:00');
    
    React.useEffect(() => {
        let wordNodes = document.querySelector(".quoteText").childNodes
        if (windex <= wordNodes.length){
            wordNodes.item(windex).className="curr"
            wordNodes.item(windex).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"})
        }
    },[windex]);

    React.useEffect(() => {
      let clock = document.querySelector('.timer')
      if( clock != null ){
        clock.innerText = timer
      }
    },[timer]);

    let parag = props.quote.toLowerCase();

    const splitQuote = () => { return  parag.split(" ")}

    const getWpm = () => {
        let words = windex + 1
        let durr = (end - start)/1000/60
        return ((words)/durr).toFixed()
    }

    const getAccuracy = () => {
        let errors = getErrorsNo()
        let words = splitQuote().length
        return ((words-errors)/words * 100).toFixed()

    }
   
   const pad = (number) => {
     return (number < 10 ? '0' : '') + number
   }

    const getTimer = () =>{
      let start = Date.now();
      setInterval(function() {
          let delta = Date.now() - start; // milliseconds elapsed since start
          let t= new Date(delta)
          let tNow = pad(t.getMinutes())+':'+pad(t.getSeconds())
          setTimer(tNow);
      }, 1000);
    }
    // const getErrWords = () => {
    //     let errors = getErrors()
    //     return console.log(errors)
    //     // return errors.forEach((index)=>{(splitQuote()[index])})
    // }

    const getErrors = () => {return [...new Set(errors)]}

    const getErrorsNo = () => {return getErrors().length}

    const handleInput = (e) => {
        let arrQuote = splitQuote() 
        if (e.target.value.length === 1 && windex === 0) {
            let time1 = new Date()
            setStart(time1.getTime())
            getTimer()
        }
        if(!(e.target.value).endsWith(' ')){
            if(arrQuote[windex].startsWith((e.target.value).trim()))
            {
                return
            }
            else {
                console.log("shit is wrong")
                setErrors(errors => [...errors, windex]);
            }
        }
        else {
            let wordNodes = document.querySelector(".quoteText").childNodes
            let word = wordNodes.item(windex)
            word.className="done"

            if (errors.length && errors.includes(windex)) {
                if(e.target.value === word.innerText)
                {
                    wordNodes[windex].classList.add('cor')
                    errors.pop(windex)
                } else {
                    wordNodes[windex].classList.add('wrong')
                }
            }

            if (windex < arrQuote.length-1 && e.target.value !== ' ') {
                console.log(windex)
                console.log(arrQuote.length)
                setWindex(windex+1)
            }

            e.target.value = ''


            if (windex === arrQuote.length-1) {
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
                        <input
                          name="typed"
                          autoFocus
                          placeholder="type here ..."
                          onInput={ handleInput }
                        />
                    </div>
                    <div className="actions">
                        <span className='timer'></span>
                        <button className='restart'
                          onClick={
                            ()=>{
                              window.location.reload()
                            }
                          }> restart
                        </button>
                    </div>
                </div>
            </div>
        )

        let result = (
        <div className="result">
          <div className="result-head">
            <h1>result</h1>
          </div>
          <div className="result-body">

          </div>
         <span>Speed: {getWpm()} WPM</span>
         <span> Acccuracy : {getAccuracy()}%</span>
         <span> Errors : {getErrorsNo()} Words</span>
            <div className="cta">
                <button onClick={
                    ()=>{window.location.reload()}}
                    > restart [ctrl+r]
                </button>
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
