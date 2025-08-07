import React from 'react'

const Footer = ({length}) => {

  return (
    <footer>
      <p>
        {length} list {length === 1 ? "item" : "items"}
      </p>
      <p className="cpr">
        &copy; Made by Shuchith
      </p>
    </footer>
  )
}

export default Footer
