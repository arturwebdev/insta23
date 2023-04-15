import { useDispatch, useSelector } from 'react-redux'
import './MessengerPeoplesMessage.css'
import { selectUsers } from '../../store/slices/users/usersSlice'
import { selectMessages, toggleActive } from '../../store/slices/messages/messagesSlice'

function MessengerPeoplesMessage({id,name,active,img}) {
	const dispatch = useDispatch()
	const {currentUser} = useSelector(selectUsers)
	const {activeUserId} = useSelector(selectMessages)
	return (
		<div onClick={() => dispatch(toggleActive({fromId: currentUser.id, toId: id}))} className={`Messenger-left-col-people-message ${id === activeUserId && 'active'}`}>
			<div className='Messsage-img'>
				<img src={img} alt=''/>
			</div>
			<div className='Message-info'>
				<p>{name}</p>
				<p>{active}</p>
			</div>
		</div>
  	)
}

export default MessengerPeoplesMessage
