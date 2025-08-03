import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const AddItems = ({newitem, setnewitem, handlesubmit}) => {
  const inputref = useRef();
  return (
    <form className='addForm' onSubmit={handlesubmit}>
        <label htmlFor="addItem">
            Add Item
        </label>
        <input 
            autoFocus
            ref={inputref}
            id='addItem'
            type='text'
            placeholder='Add'
            required
            value={newitem}
            onChange={(e) => {
              setnewitem(e.target.value)
            }}
        />
        <button type='submit' aria-label='Add Item' onClick={() => inputref.current.focus()}>
            <FaPlus/>
        </button>
    </form >
  )
}

export default AddItems
