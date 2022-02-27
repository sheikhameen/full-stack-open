import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const showSuccessNotification = message => {
    setNotificationMessage({type:'success', text:message})
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000);
  }

  const showErrorNotification = message => {
    setNotificationMessage({type:'error', text:message})
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000);
  }

  const changeNumberOf = id => {
    const person = persons.find(p => p.id === id)
    const updatedPerson = { ...person, number: newNumber }

    personService
      .update(id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        showSuccessNotification(`Changed number of ${returnedPerson.name}`)
      })
      .catch(error => {
        showErrorNotification(error.response.data.error)

        if (error.response.status === 404) setPersons(persons.filter(p => p.id !== id))
        // showErrorNotification(`Information of ${person.name} has already been removed from server`)
      })
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') {
      showErrorNotification('Name or number missing')
      return
    }

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
        showSuccessNotification(`Added ${returnedPerson.name}`)
      })
      .catch(error => {
        console.log(error.response.data)
        showErrorNotification(error.response.data.error)
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
      <Notification message={notificationMessage} />
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