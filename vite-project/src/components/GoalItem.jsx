import React from "react";

function GoalItem({ goal, onDelete, onEdit }) {
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isOverdue = new Date(goal.deadline) < new Date() && !isCompleted;
  const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100).toFixed(1);

  let status = "In Progress";
  if (isCompleted) status = "Completed";
  else if (isOverdue) status = "Overdue";
  else if (new Date(goal.deadline) - new Date() < 1000 * 60 * 60 * 24 * 30) status = " Deadline Near";

  return (
    <div className="goal-item">
      <h3>{goal.name} <span className="category">[{goal.category}]</span></h3>
      <p>Target: ${goal.targetAmount}</p>
      <p>Saved: ${goal.savedAmount}</p>
      <p>Deadline: {goal.deadline}</p>
      <p>Status: {status}</p>
      <div className="progress-bar">
        <div style={{ width: `${progress}%` }}>{progress}%</div>
      </div>
      <button onClick={() => onEdit(goal)}>Edit</button>
      <button onClick={() => onDelete(goal.id)}>Delete</button>
    </div>
  );
}

export default GoalItem;