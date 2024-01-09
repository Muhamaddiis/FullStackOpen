import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import person from './services/personmod';


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filteredName, setFilteredName] = useState('');

  useEffect(() => {
    console.log('effect')
    person
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    setNewName(e.target.value)
    console.log(newName);
  };
  const handleNumber = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const nameExist = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase())

    if (nameExist) {
      const confirmUpdate = window.confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`);
  
      if (confirmUpdate) {
        const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        person.update(existingPerson.id, updatedPerson)
          .then((res) => {
            setPersons(persons.map((person) => (person.id !== existingPerson.id ? person : res)));
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            // Handle the error, e.g., display an error message
            console.error('Error updating number:', error);
          });
      }
      return;
    }


    const newObject = {
      name: newName,
      number: newNumber
    }
    person.create(newObject).then(res => {
      setPersons(persons.concat(res))
      setNewName('')
      setNewNumber('')
    })

    console.log('clicked');
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete this person?")) {
      person.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  

  const handleFilter = (e) => {
    e.preventDefault()
    const searchTerm = e.target.value
    setFilteredName(searchTerm)
  }

  const addPersonData = {
    newName,
    newNumber,
    handleChange,
    handleNumber
  }

  const search = persons.filter((person) => person.name.toLowerCase().includes(filteredName.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilter} value={filteredName} />
      <h2>Numbers</h2>
      <PersonForm addPerson={handleSubmit} data={addPersonData} />
      <div>
        {search.map(person => <p key={person.id}>{person.name} - {person.number} <span><button onClick={ () =>handleDelete(person.id)}>Delete</button></span></p>)}
      </div>
    </div>
  )
}

export default App