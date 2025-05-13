import { useState } from 'react'

const defaultParticipants = [
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
  const [participants, setParticipants] = useState(defaultParticipants)
  const [assignments, setAssignments] = useState({})

  const handleAddParticipant = participant => {
    setParticipants([...participants, participant])
  }

  const handleAssignGifts = () => {
    const result = assignGifts(participants)
    if (result) setAssignments(result)
  }

  const assignGifts = participants => {
    if (participants.length < 2) {
      alert('At least 2 participants are required.')
      return null
    }

    const givers = [...participants]
    const receivers = [...participants]
    const result = {}

    let attempt = 0
    const maxAttempts = 100

    while (attempt < maxAttempts) {
      // Shuffle receivers randomly
      receivers.sort(() => Math.random() - 0.5)

      // Check for valid assignment (no self-giving)
      const isValid = givers.every((giver, i) => giver.id !== receivers[i].id)

      if (isValid) {
        for (let i = 0; i < givers.length; i++) {
          result[givers[i].name] = receivers[i].name
        }
        return result
      }

      attempt++
    }

    alert('Failed to generate valid assignments. Please try again.')
    return null
  }

  const handleReset = () => {
    setParticipants(defaultParticipants)
    setAssignments({})
  }

  return (
    <div className="app">
      <h1>🎅 Secret Santa Planner</h1>
      <ParticipantForm onAddParticipant={handleAddParticipant} />
      <ParticipantList participants={participants} />
      <div className="button-panel">
        <button onClick={handleAssignGifts} className="assign">
          🪄 Assign Gifts
        </button>
        <button onClick={handleReset} className="reset">
          🔄 Reset All
        </button>
      </div>
      <AssignmentsDisplay assignments={assignments} />
    </div>
  )
}

const ParticipantForm = ({ onAddParticipant }) => {
  const [addParticipant, setAddParticipant] = useState('')

  const newParticipant = {
    id: window.crypto.randomUUID(),
    name: addParticipant
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(addParticipant, 'add')
    setAddParticipant('')
    onAddParticipant(newParticipant)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>👤 Participant Name: </label>
      <input
        type="text"
        value={addParticipant}
        onChange={e => setAddParticipant(e.target.value)}
        placeholder="Name"
      />
      <Button>Add</Button>
    </form>
  )
}

const ParticipantList = ({ participants }) => {
  return (
    <ul>
      {participants.map(participant => (
        <li key={participant.id}>{participant.name}</li>
      ))}
    </ul>
  )
}

const AssignmentsDisplay = ({ assignments }) => {
  if (!assignments || Object.keys(assignments).length === 0) return null

  return (
    <div className="assignments-container">
      <h2>🎁 Secret Santa Matches</h2>
      <div className="assignment-grid">
        {Object.entries(assignments).map(([giver, receiver]) => (
          <div key={giver} className="assignment-card">
            <span className="giver">
              🎅 <strong>{giver}</strong>
            </span>
            <span className="arrow">➡️</span>
            <span className="receiver">
              🎁 <strong>{receiver}</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App