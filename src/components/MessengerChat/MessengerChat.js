import { useSelector } from 'react-redux'
import './MessengerChat.css'
import { selectMessages } from '../../store/slices/messages/messagesSlice'
import { selectUsers } from '../../store/slices/users/usersSlice'
import { useEffect, useRef } from 'react'

function MessengerChat() {
  const {currentDialog} = useSelector(selectMessages)
  const {currentUser} = useSelector(selectUsers)
  const chat = useRef(null)

  useEffect(() => {
    chat.current.scrollTop = chat.current.scrollHeight
  }, [currentDialog])

  return (
	 <div ref={chat} className='MessengerChat'>
    {
      currentDialog.map(message => (
        <h2 className={message.fromId !== currentUser.id ? 'answer' : ''} key={message.id}><span>{message.body}</span></h2>
      ))
    }

	 </div>
  )
}

export default MessengerChat
