const participants = [
  { id: '1', name: 'Clark' },
  { id: '2', name: 'Diana' },
  { id: '3', name: 'Bruce' },
  { id: '4', name: 'Barry' },
  { id: '5', name: 'Lois' }
]

const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

const App = () => {
  return (
    <div className="app">
      <h1>🎅 Secret Santa Planner</h1>
      <ParticipantForm />
      <ParticipantList />
      <div className="button-panel">
        <button className={`assign`}>🎁 Assign Gifts</button>
        <button className="reset">🔄 Reset All</button>
      </div>
      <AssignmentsDisplay />
    </div>
  )
}

const ParticipantForm = () => {
  return (
    <form>
      <label>👤 Participant Name: </label>
      <input type="text" placeholder="Name" />
      <Button>Add</Button>
    </form>
  )
}

const ParticipantList = () => {
  return (
    <ul>
      {participants.map(participant => (
        <li key={participant.id}>{participant.name}</li>
      ))}
    </ul>
  )
}

const AssignmentsDisplay = () => {
  return <div className="assignment">Assignments</div>
}

export default App