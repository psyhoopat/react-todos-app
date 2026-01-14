import React, { useState, useRef, useMemo } from 'react';

const App = () => {
  const nextId = useRef(4);
  const refTest = useRef(null)
  const [text, setText] = useState('');
  const [hide, setHide] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, text: 'Задача 1', done: true },
    { id: 2, text: 'Задача 2', done: true },
    { id: 3, text: 'Задача 3', done: false },
  ]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, { id: nextId.current++, text: text.trim(), done: false }]);
    setText('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const visibleTodos = useMemo(
    () => todos.filter(todo => !hide || !todo.done),
    [todos, hide]
  );

  const controlDOM = () => {
    console.log(refTest.current)
    refTest.current.textContent = 'Mountent';
    refTest.current.style.color = 'red';
  }

  return (
    <div className="App">
      <form onSubmit={addTodo}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Добавить задачу"
        />
        <button type="submit">Добавить</button>
      </form>

      <ul>
        {visibleTodos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
            />
            <span style={todo.done ? { textDecoration: 'line-through' } : {}}>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>X</button>
          </li>
        ))}
      </ul>

      <button onClick={() => setHide(!hide)}>
        {hide ? 'Показать все' : 'Скрыть выполненные'}
      </button>

      <button style={{ display: 'block', marginTop: '20px' }} onClick={() => controlDOM()}>Control DOM element</button>
      <h3 ref={refTest}>Element</h3>
    </div>
  );
};

export default App;
