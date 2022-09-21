import React from "react"
import countAPI from './countData'
import Count from './components/Count'

export default function App(){
    const [countData, setCountData] = React.useState(countAPI)
    const [resetGame, setResetGame] = React.useState(() => false)
    
    function toggleClick(event, id){
        
        setCountData(oldCountData => {
            let newArr=[]
            for(let i=0; i<oldCountData.length; i++){
                if(i+1 === id){
                    newArr.push({...oldCountData[i], isClick: !oldCountData[i].isClick})
                }else{
                    newArr.push({...oldCountData[i]})
                }
            }
            return newArr
        })
    }
    
    function roll(){
        setCountData(oldCountData => {
            let newArr=[]
            for(let i=0; i<oldCountData.length; i++){
                if(!oldCountData[i].isClick){
                    const randomNum = Math.floor(Math.random() * 10)
                    newArr.push({...oldCountData[i], count: randomNum})
                }else{
                    newArr.push({...oldCountData[i]})
                }
            }
            return newArr
        })
    }
    
    function resetDice(){
        setCountData(oldCountData => {
            let newArr=[]
            for(let i=0; i<oldCountData.length; i++){
                const randomNum = Math.floor(Math.random() * 10)
                newArr.push({...oldCountData[i], count: randomNum, isClick: false})
            }
            return newArr
        })
    }
    
    React.useEffect(() => {
        const result = countData.every(element => {
            if (element.count === countData[0].count && element.isClick) {
                return true;
            }
        });
        setResetGame(result)
    }, [countData])
    
    return(
        <div className="main-section">
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <Count count={countData} toggleClick={toggleClick}/>
            <button className="btn-roll" onClick={resetGame ? resetDice : roll}>{resetGame ? "Reset Game" : "Roll"}</button>
        </div>
    )
}