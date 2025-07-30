import React from "react";

function GoalItem({ goal, onDelete, onEdit }) {
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isOverdue = new Date(goal.deadline) < new Date() && !isCompleted;
  const isNearDeadline =
    new Date(goal.deadline) - new Date() < 1000 * 60 * 60 * 24 * 30 && !isCompleted;

  const progress = Math.min(
    (goal.savedAmount / goal.targetAmount) * 100,
    100
  ).toFixed(1);

  let status = "In Progress";
  if (isCompleted) status = "Completed";
  else if (isOverdue) status = "Overdue";
  else if (isNearDeadline) status = "Deadline Near";

  return (
    <div className="goal-item">
      <h3>
        {goal.name}{" "}
        <span className="category" style={{ fontStyle: "italic", fontSize: "0.9em" }}>
          [{goal.category}]
        </span>
      </h3>
      <p>Target: ${goal.targetAmount}</p>
      <p>Saved: ${goal.savedAmount}</p>
      <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
      <p>Status: <strong>{status}</strong></p>

      <div className="progress-bar" style={{
        height: "20px",
        background: "#eee",
        borderRadius: "10px",
        overflow: "hidden",
        margin: "10px 0"
      }}>
        <div style={{
          width: `${progress}%`,
          background: progress >= 100 ? "#4caf50" : "#2196f3",
          color: "#fff",
          textAlign: "center",
          lineHeight: "20px",
          transition: "width 0.3s ease"
        }}>
          {progress}%
        </div>
      </div>

      <button onClick={() => onEdit(goal)} style={{ marginRight: "8px" }}>
        Edit
      </button>
      <button onClick={() => onDelete(goal.id)}>
        Delete
      </button>
    </div>
  );
}

export default GoalItem;
