const Persons = ({ persons, deleteHandler }) => (
  <div>
    {persons.map(
      person => <div key={person.name}>{person.name} {person.number} <button onClick={() => deleteHandler(person.id)}>Delete</button></div>
    )}
  </div>
)

export default Persons