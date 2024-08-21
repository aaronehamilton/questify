from flask import request, jsonify
from config import app, db
from models import Quest

@app.route("/quests", methods=["GET"])
def get_contacts():
    quests = Quest.query.all()
    json_quests = list(map(lambda x: x.to_json(), quests))
    return jsonify({"quests": json_quests})

@app.route("/create_quest", methods=["POST"])
def create_quest():
    goal = request.json.get("goal")
    deadline = request.get("deadline")
    description = request.get("description")

    if not goal or not deadline or not description:
        return (
            jsonify({"message": "You must include a goal, deadline, and description"}),
            400,
        )
    
    new_quest = Quest(goal=goal, deadline=deadline, description=description)
    try:
        db.session.add(new_quest)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Quest created!"}), 201

@app.route("/update_quest/<int:user_id", methods=["PATCH"])
def update_quest(user_id):
    quest = Quest.query.get(user_id)

    if not quest:
        return jsonify({"message": "Quest not found"}), 404
    
    data = request.json
    quest.goal = data.get("goal", quest.goal)
    quest.deadline = data.get("deadline", quest.deadline)
    quest.description = data.get("description", quest.description)

    db.session.commit()

    return jsonify({"message": "Quest updated."}), 200

@app.route("/delete_quest/<int:user_id>", methods=["DELETE"])
def delete_quest(user_id):
    quest = Quest.query.get(user_id)

    if not quest:
        return jsonify({"message": "Quest not found"}), 404
    
    db.session.delete(quest)
    db.session.commit()

    return jsonify({"message": "Quest deleted!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()



    app.run(debug=True)