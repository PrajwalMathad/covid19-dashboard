import React from 'react';

const Card = (props) => {
    return (
        <div className="cards">
            <div className={`${props.label}-card`}>{props.label}</div>
            <div className="count">{props.count}</div>
        </div>
    )
}

export default Card;