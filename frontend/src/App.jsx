import { useState, useEffect } from 'react'
import QuestList from './QuestList'
import './App.css'
import QuestForm from './QuestForm'

function App() {
  const [quests, setQuests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentQuest, setCurrentQuest] = useState({})

  useEffect(() => {
    fetchQuests()
  }, [])

  const fetchQuests = async () => {
    const response = await fetch("http://127.0.0.1:5000/quests")
    const data = await response.json()
    setQuests(data.quests)
    console.log(data.quests)
  };

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentQuest({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal = (quest) => {
    if (isModalOpen) return
    setCurrentQuest(quest)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchQuests()
  }

  return (
    <>
      <QuestList quests={quests} updateQuest={openEditModal} updateCallback={onUpdate}/>
      <button onClick={openCreateModal}>Create New Quest</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <QuestForm existingQuest={currentQuest} updateCallback={onUpdate} />
        </div>
      </div>

      }
    </>
  );
}

export default App
