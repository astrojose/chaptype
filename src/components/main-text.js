import React from 'react'


const MainText = () => {
    let [current,setCurrent] = React.useState()
    let [windex, setWindex] = React.useState(0)
    let [errors,setError]=React.useState([])

    React.useEffect(() => {
        let wordNodes = document.querySelector(".quoteText").childNodes
        wordNodes.item(windex).className="curr"
        window.addEventListener('keyup', (event) => {
          if (event.code === 'Space') {
            if (document.activeElement.nodeName.toLowerCase() =='input' && current!='') {
                const currentWordNode = wordNodes.item(windex)
                if (currentWordNode.getAttribute('wordind') <= wordNodes.length-1) {
                    if (current === currentWordNode.innerText.trim() && currentWordNode.getAttribute('wordind') == windex) {
                        console.log('your name is modasuka')
                        currentWordNode.className='right'
                    }
                    
                    else{
                        console.log('totally false')
                        currentWordNode.className='wrong'
                        setError(errors => [...errors, currentWordNode.innerText.trim()]);

                    }
                    event.target.value = ''
                    setWindex(windex+1)   
                }
                else{
                    alert('shit is')
                }
            }        
          }
        });
      },[errors]);
    
    let parag = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi vel nobis omnis ducimus"
    let fragParag = parag.split(" ")
    return (
        <div className="typing">
                <div className="quote">
                    <p className="quoteText"> 
                        {fragParag.map( (word,index) => ( <span wordind={index}> { word } </span>))}
                     </p>
                </div>
                <div className="current">
                    <div className="input">
                        <input name="typed" 
                            placeholder="Type the above text here ..." 
                            autoFocus 
                            onChange={(e)=> setCurrent(e.target.value.trim()) }
                            />
                        <div className="actions">
                            <button>Restart</button>
                        </div>
                    </div>
                    <div className="status"> </div>
                </div>
            </div>
    )
}

export default MainText