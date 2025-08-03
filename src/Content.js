import React from 'react'
import ItemList from './ItemList';

const Content = ({items, handlecheck, handledelete}) => {
  return (
    <>
      {items.length ? (
        <ItemList
          items={items}
          handlecheck={handlecheck}
          handledelete={handledelete}
        />
      ) : (
        <p style={{marginTop: '2rem'}}>
          Your list is empty
        </p>
      )}
    </>
  )
}

export default Content
