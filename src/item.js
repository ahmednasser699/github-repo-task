import React from 'react'
import moment from 'moment'
import './style.css'

const Item = ({avatar, name, description ,issues, stars, user, date}) => {
    return (
        <div className='item'>
            <img className='image' src={avatar} alt='' />
             <div className="content">
                <div className="header">{ name}</div>
                {description?<h5>{description}</h5>:<h5>no description</h5>}
                <span className='issues'>{`issues: ${issues}`}</span>
                <span className='stars'>{`stars:${stars}`}</span>
                <span className='user'>{`submitted ${moment(date).fromNow()} by ${user}`}</span>
    </div>
        </div>
    )
}

export default Item
