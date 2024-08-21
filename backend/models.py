from config import db

class Quest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    goal = db.Column(db.String(160), unique=False, nullable=False)
    deadline = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "goal": self.goal,
            "deadline": self.deadline,
            "description": self.description,
        }