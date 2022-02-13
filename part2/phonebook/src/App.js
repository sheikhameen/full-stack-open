import { useState } from 'react'

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

const Persons = ({ persons }) => (
  <div>
    {persons.map(
      person => <div key={person.name}>{person.name} {person.number}</div>
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    let nameExists = persons.find(person => person.name === newName)
    if (nameExists) return alert(`${newName} is already added to the phonebook`)

    const newPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
      (person.name.toLowerCase().indexOf(searchInput.toLowerCase()) === -1) ? false : true
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
      />

    </div>
  )
}

export default App