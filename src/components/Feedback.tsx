import { useTodoDispatch, useTodos } from '../context/TodoContext'
import { ETodoActionKind } from '../reducer/todo'
import { Alert } from './UI/Alert'

const Feedback = () => {
  const { feedback } = useTodos()
  const dispatch = useTodoDispatch()

  if (!feedback) return null

  const { text, type, show } = feedback

  const closeAlert = () => {
    dispatch({
      type: ETodoActionKind.DISPLAY_FEEDBACK,
      payload: {
        feedback: null,
      },
    })
  }

  return (
    <section>
      <Alert text={text} severity={type} show={show} onClose={closeAlert} />
    </section>
  )
}

export { Feedback }
