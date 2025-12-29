import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (inputValue.trim() === '') return
    
    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date().toLocaleString('ko-KR')
    }
    
    setTodos([newTodo, ...todos])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo()
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length
  const totalCount = todos.length

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  })

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 오늘 할 일</h1>
          <p className="date">{today}</p>
        </header>

        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="할 일을 입력하세요..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-button">
            추가
          </button>
        </div>

        <div className="stats">
          <span className="stat-item">전체: {totalCount}</span>
          <span className="stat-item">완료: {completedCount}</span>
        </div>

        {todos.length === 0 ? (
          <div className="empty-state">
            <p>🎉 할 일을 추가해보세요!</p>
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map(todo => (
              <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <div className="todo-content">
                  <span className="todo-text">{todo.text}</span>
                  <span className="todo-date">{todo.createdAt}</span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)} 
                  className="delete-button"
                  aria-label="삭제"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
