import { useState } from 'react'
import { Link } from 'react-router-dom'
import { io } from 'socket.io-client'

function Home () {
    const [roomName, setRoomName] = useState('')

    const handleRoomNameChange = (e) => {
        setRoomName(e.target.value)
    }

    return(
        <div className='home-container'>
            <input type="text" placeholder='Write a name for the room' value={roomName} onChange={handleRoomNameChange} className='border-2 border-zinc-500 p-2 w-full text-black'/>
            <Link to={`room/${roomName}`} className='enter-room-button'>Join room</Link>
        </div>
    )
}

export default Home