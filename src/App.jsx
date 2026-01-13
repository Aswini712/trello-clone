import { useState } from 'react'

import './App.css'

function App() {
  const [cards, setCards] = useState([])
  const [newCardText, setNewCardText] = useState('')
  const [showInput, setShowInput] = useState(false)

  const columns = ['Todo', 'In Progress', 'Done']

  const addCard = () => {
    if (newCardText.trim()) {
      const newCard = {
        id: Date.now(),
        text: newCardText.trim(),
        column: 'Todo'
      }
      setCards([...cards, newCard])
      setNewCardText('')
      setShowInput(false)
    }
  }

  const moveCard = (cardId, targetColumn) => {
    setCards(cards.map(card =>
      card.id === cardId ? { ...card, column: targetColumn } : card
    ))
  }

  const deleteCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId))
  }

  const getCardsForColumn = (columnName) => {
    return cards.filter(card => card.column === columnName)
  }

  const getAvailableColumns = (currentColumn) => {
    return columns.filter(col => col !== currentColumn)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Trello Clone</h1>
      </header>

      <div className="board">
        {columns.map(column => (
          <div key={column} className="column">
            <h2 className="column-title">{column}</h2>
            <div className="cards-container">
              {getCardsForColumn(column).map(card => (
                <div key={card.id} className="card">
                  <div className="card-content">
                    <p>{card.text}</p>
                  </div>
                  <div className="card-actions">
                    <select
                      className="move-select"
                      value={card.column}
                      onChange={(e) => moveCard(card.id, e.target.value)}
                    >
                      <option value={card.column}>{card.column}</option>
                      {getAvailableColumns(card.column).map(col => (
                        <option key={col} value={col}>Move to {col}</option>
                      ))}
                    </select>
                    <button
                      className="delete-btn"
                      onClick={() => deleteCard(card.id)}
                      aria-label="Delete card"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="add-card-section">
        {showInput ? (
          <div className="add-card-form">
            <textarea
              className="card-input"
              value={newCardText}
              onChange={(e) => setNewCardText(e.target.value)}
              placeholder="Enter card text..."
              rows="3"
              autoFocus
            />
            <div className="form-buttons">
              <button className="add-btn" onClick={addCard}>
                Add Card
              </button>
              <button className="cancel-btn" onClick={() => {
                setShowInput(false)
                setNewCardText('')
              }}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button className="show-input-btn" onClick={() => setShowInput(true)}>
            + Add New Card
          </button>
        )}
      </div>
    </div>
  )
}

export default App
