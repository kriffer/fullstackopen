
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [message, setMessage] = useState({})

  useEffect(() => {
    personsService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    let dup = false;

    let person = persons.filter(person => person.name === newName)[0]

    if (person) {

      dup = true;

      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with new one?`)) {
        let updatedPerson = { ...person, number: newNumber }
        personsService.update(person.id, updatedPerson)
          .then(data => {
            setPersons(persons.map(p => p.id !== person.id ? p : data))
            setNewName('')
            setNewNumber('')
          }).catch(error => {
            setMessage({
              text: `Information of '${person.name}' has already been removed from server`, type: 'error'
            }
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setPersons(persons.filter(p => p.id !== person.id))
            setNewName('')
            setNewNumber('')
          })
      } else { return }

    }

    if (!dup) {

      let newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
      personsService.create(newPerson)
        .then(data => {
          setPersons(persons.concat(newPerson))
          setMessage({ text: `Added ${newName}`, type: 'success' })
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })

      setNewName('')
      setNewNumber('')
    }
  }



  const deletePerson = (e, person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then(data => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
    } else { return }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setSearchName(event.target.value)
  }

  const newPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchName={searchName} handleFilter={handleFilter} />
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={newPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App;
