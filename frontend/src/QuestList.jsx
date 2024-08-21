import React from "react"

const QuestList = ({ quests, updateQuest, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_quest/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return <div>
        <h2>Quest Log</h2>
        <table>
            <thead>
                <tr>
                    <th>Goal</th>
                    <th>Deadline</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {quests.map((quest) => (
                    <tr key={quest.id}>
                        <td>{quest.goal}</td>
                        <td>{quest.deadline}</td>
                        <td>{quest.description}</td>
                        <td>
                            <button onClick={() => updateQuest(quest)}>Update</button>
                            <button onClick={() => onDelete(quest.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default QuestList