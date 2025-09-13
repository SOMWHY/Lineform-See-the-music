import React from "react"

const InfoText = ({ name, children }) => {
  return (
    <div className='info pr-lg flex justify-between'>
      {`-${name}`}:<i>{children}</i>
    </div>
  )
}

export default InfoText
