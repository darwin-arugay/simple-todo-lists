import './styles.css'
import Todo from './components/todo-list/Todo'
import Header from './components/Header'
import { TodoProvider } from './context/TodoContext'

export default function App() {
  return (
    <main>
      <TodoProvider>
        <Header />
        <Todo />
      </TodoProvider>
    </main>
  )
}
