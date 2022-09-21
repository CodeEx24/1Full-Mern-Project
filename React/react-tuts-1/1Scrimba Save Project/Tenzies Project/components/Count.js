import React from 'react'

export default function Count(props){
        const countElement = props.count.map(perCount => {
        
        return(
            <button className="btn-num" key={perCount.id}>{perCount.count} </button>
        )
    })
    
    
    return (
        <div className="main-btn">
            {countElement}
        </div>
    )
}