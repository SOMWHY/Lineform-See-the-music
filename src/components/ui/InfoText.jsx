import React from 'react'

const InfoText = ({name,children}) => {
  return (
        <div className='info'>
          {`-${name}`}: &nbsp;
          <i>{children}</i>
        </div>
  )
}

export default InfoText