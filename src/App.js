const participants = [
  { id: '1', name: 'Clark' },
  { id: '2', name: 'Diana' },
  { id: '3', name: 'Bruce' },
  { id: '4', name: 'Barry' },
  { id: '5', name: 'Lois' }
]

const Button = () => {
  return <button>Add</button>
}

const App = () => {
  return (
    <div className="app">
      <h1>🎅 Secret Santa Planner</h1>
      <ParticipantForm />
      <ParticipantList />
      {/*<Button>🎁 Assign Gifts</Button>*/}
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