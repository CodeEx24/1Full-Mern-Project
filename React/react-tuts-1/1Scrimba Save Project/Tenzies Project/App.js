import React from "react"
import countAPI from './countData'
import Count from './components/Count'

export default function App(){
    const [countData, setCountData] = React.useState(countAPI)
    
    function isClick(){
        
    }
    
    function roll(){
        setCountData(oldCountData => {
            let newArr=[]
            for(let i=0; i<oldCountData.length; i++){
                const randomNum = Math.floor(Math.random() * 10)
                newArr.push({...oldCountData[i], count: randomNum})
            }
            return newArr
        })
    }
    
    React.useEffect(() => {
        console.log("NEW ARRAY")
        for(let i=0; i<10; i++){
            console.log(countData[i].count)
        }
    }, [countData])
    
    return(
        <div className="main-section">
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <Count count={countData} isClick={isClick}/>
            <button className="btn-roll" onClick={roll}>Roll</button>
        </div>
    )
}