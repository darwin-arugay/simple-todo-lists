import './styles.css'
import Todo from './components/todo-list/Todo'
import { TodoProvider } from './context/TodoContext'

export default function App() {
  return (
    <main>
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </main>
  )
}
