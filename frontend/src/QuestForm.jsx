import {useState} from "react"

const QuestForm = ({ existingQuest = {}, updateCallback}) => {
    const [goal, setGoal] = useState(existingQuest.goal || "");
    const [deadline, setDeadline] = useState(existingQuest.deadline || "");
    const [description, setDescription] = useState(existingQuest.description || "");

    const updating = Object.entries(existingQuest).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            goal,
            deadline,
            description
        }
        const url = "http://127.0.0.1:5000/" + (updating ? `update_quest/${existingQuest.id}`: "create_quest")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(message.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="goal">Goal:</label>
                <input
                    type="text" 
                    id="goal" 
                    value={goal} 
                    onChange={(e) => setGoal(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="deadline">Deadline:</label>
                <input
                    type="text" 
                    id="deadline" 
                    value={deadline} 
                    onChange={(e) => setDeadline(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input
                    type="text" 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );
};

export default QuestForm