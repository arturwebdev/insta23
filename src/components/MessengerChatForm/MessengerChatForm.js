import './MessengerChatForm.css'
import IMAGES from '../../images'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUsers } from '../../store/slices/users/usersSlice'
import { addMessage } from '../../store/slices/messages/messagesSlice'

function MessengerChatForm() {
	const formRef = useRef(null)
	const { currentUser } = useSelector(selectUsers)
	const dispatch = useDispatch()

	const handleSubmit = (e) => {
		e.preventDefault()
		const body = formRef.current[0].value
		dispatch(addMessage({
			fromId: currentUser.id,
			body
		}))
		formRef.current.reset()
	}
  return (
	<form ref={formRef} onSubmit={handleSubmit}>
	 <div className='Chat-input'>
		<input type='text' placeholder='Message...'/>
		<label>
			<img src={IMAGES.like} alt=''/>
			<input type="submit" style={{display: 'none'}} />
		</label>

	 </div>
	</form>
  )
}

export default MessengerChatForm
