/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const PersonForm = ({addPerson, data}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
          name: <input onChange={data.handleChange} value={data.newName} required/>
        </div>
        <div>number: <input onChange={data.handleNumber} value={data.newNumber} required/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm