import React from 'react'
import {FaTrashAlt} from 'react-icons/fa';

const LineItems = ({item, handlecheck, handledelete}) => {
  return (
    <li className={`item ${item.item.toLowerCase()}`}>
        <input type="checkbox" onChange={() => handlecheck(item.id)} checked={item.checked}/>
        <label onDoubleClick={() => handlecheck(item.id)}>
        {item.item}
        </label>
        <FaTrashAlt onClick={() => handledelete(item.id)} type="button" tabIndex="0" 
            aria-label={`Delete ${item.item}`}/>
    </li>
  )
}

export default LineItems
