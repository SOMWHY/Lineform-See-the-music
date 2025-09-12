import React from 'react'

const SongTitle = ({song,artist}) => {
  return (
    <p className='line-clamp-1 text-left'>
            <i>{song ?? "song"}</i> - {artist ?? "artist"}
          </p>
  )
}

export default SongTitle