import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ value, onChange }) => <div>Filter shown with <input value={value} onChange={onChange} /></div>

const PersonForm = ({ onSubmit, nameValue, numberValue, nameOnChange, numberOnChange }) => (
  <form onSubmit={onSubmit}>
    <div>
      Name: <input value={nameValue} onChange={nameOnChange} />
    </div>
    <div>
      Number: <input value={numberValue} onChange={numberOnChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, deleteHandler }) => (
  <div>
    {persons.map(
      person => <div key={person.name}>{person.name} {person.number} <button onClick={() => deleteHandler(person.id)}>Delete</button></div>
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const changeNumberOf = id => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, number: newNumber }

    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    let person = persons.find(person => person.name === newName)
    if (person) {
      const confirm = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) changeNumberOf(person.id)

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = id => {
    const personToDelete = persons.find(person => person.id === id)

    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      personService
        .deleteResource(id)
        .then(response => {
          const existingPersons = persons.filter(person => !(person.id === id))
          const existingPersonsCopy = existingPersons.map(person => ({ ...person }))

          setPersons(existingPersonsCopy)
        })
    }
  }

  const handleNameOnChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberOnChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchOnChange = (event) => {
    setSearchInput(event.target.value)
  }

  const personsToShow = (searchInput === '')
    ? persons
    : persons.filter(person =>
      (person.name.toLowerCase().includes(searchInput.toLowerCase())) ? true : false
    )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        value={searchInput}
        onChange={handleSearchOnChange}
      />

      <h3>Add a new</h3>

      <PersonForm
        onSubmit={addPerson}
        nameValue={newName}
        numberValue={newNumber}
        nameOnChange={handleNameOnChange}
        numberOnChange={handleNumberOnChange}
      />

      <h3>Numbers</h3>

      <Persons
        persons={personsToShow}
        deleteHandler={deletePerson}
      />

    </div>
  )
}

export default App