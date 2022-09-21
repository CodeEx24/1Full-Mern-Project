import React from 'react'

export default function Count(props){
        const countElement = props.count.map(perCount => {
        
        const styles ={
            backgroundColor: "#59E391"
        }
        
        const buttonDefaultStyle = {
            backgroundColor: "white"
        }
     
        
        return(
            <button className="btn-num" key={perCount.id} onClick={(event) => props.toggleClick(event, perCount.id)} style={perCount.isClick ? styles : buttonDefaultStyle}>{perCount.count} </button>
        )
    })
    
    
    return (
        <div className="main-btn">
            {countElement}
        </div>
    )
}