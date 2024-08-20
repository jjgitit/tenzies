import React from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const first = dice[0]
    if (dice.every(element => element.value === first.value)) {
      setTenzies(true)
    } else {
      setTenzies(false)
    }
  }, [dice])

  
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function holdDice(id) {
    setDice(prev => prev.map(die => {
      return die.id === id ?
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prev => prev.map( die => {
        return die.isHeld ? 
            die : generateNewDie()
      }))
    } else {
      setDice(allNewDice())
    }
  }
  
  
  const diceElements = dice.map(die => (
  <Die 
      key={die.id} 
      tenzies={tenzies} 
      value={die.value} 
      isHeld={die.isHeld} 
      holdDice={() => holdDice(die.id)} 
  />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <div className='dice-container'>
        {diceElements}
      </div>
      <button onClick={rollDice} className='roll'>
        {tenzies? "New Game" : "Reroll"}
      </button>
    </main>
  );
}

export default App;
