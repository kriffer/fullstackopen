
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



  const updatePerson = (person) => {

    if (window.confirm(`${person.name} is already added to phonebook, replace the old number with new one?`)) {

      personsService.getAll().then(persons => {
        let personToUpdate = persons.filter(p => p.name === person.name)[0]
        let updatedPerson = { ...personToUpdate, number: newNumber }
        console.log(updatedPerson)
        personsService.update(updatedPerson.id, updatedPerson)
          .then(data => {
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : data))
            setNewName('')
            setNewNumber('')
          }).catch(error => {
            setMessage({
              text: `Information of '${updatedPerson.name}' has already been removed from server`, type: 'error'
            }
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setPersons(persons.filter(p => p.id !== person.id))
            setNewName('')
            setNewNumber('')
          })
      })
    } else { return }

  }


  const addPerson = (event) => {
    event.preventDefault()


    let newPerson = { name: newName, number: newNumber }
    personsService.create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setMessage({ text: `Added ${createdPerson.name}`, type: 'success' })
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        console.log(error.response.data)
      
        if (error.response.data.error.includes('Person validation failed: name:')) {
          updatePerson(newPerson)
        }
        
      })

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
