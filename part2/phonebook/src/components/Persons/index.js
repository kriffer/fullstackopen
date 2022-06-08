const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person =>
        <div key={person.id}>{person.name} {person.number} <button onClick={(e) => props.deletePerson(e,person)}>delete</button></div>
      )}
    </div>
  )
}

export default Persons