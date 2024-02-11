import './styles.css'
import Todo from './components/todo-list/Todo'
import { TodoProvider } from './context/TodoContext'
import { Feedback } from './components/Feedback'

export default function App() {
  return (
    <main>
      <TodoProvider>
        <Feedback />
        <Todo />
      </TodoProvider>
    </main>
  )
}
