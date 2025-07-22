import React from "react";

function GoalList({ goals, onEdit, onDelete, onDepositClick }) {
  return (
    <div className="goal-list">
      <h2>Your Goals</h2>
      {goals.length === 0 ? (
        <p>No goals added yet.</p>
      ) : (
        <div className="grid">
          {goals.map((goal) => {
            const percentage = Math.min(
              100,
              (goal.savedAmount / goal.targetAmount) * 100
            );

            const warningColor =
              percentage >= 100
                ? "bg-green"
                : percentage >= 75
                ? "bg-blue"
                : percentage >= 50
                ? "bg-yellow"
                : "bg-red";

            return (
              <div key={goal.id} className="goal-card">
                <h3>{goal.name}</h3>
                <p><strong>Category:</strong> {goal.category}</p>
                <p><strong>Target:</strong> ${goal.targetAmount}</p>
                <p><strong>Saved:</strong> ${goal.savedAmount}</p>

                <div className="progress-bar">
                  <div
                    className={`progress ${warningColor}`}
                    style={{ width: `${percentage}%` }}
                  >
                    {Math.round(percentage)}%
                  </div>
                </div>

                <div className="goal-actions">
                  <button onClick={() => onEdit(goal.id, goal)}>Edit</button>
                  <button onClick={() => onDelete(goal.id)}> Delete</button>
                  <button onClick={() => onDepositClick(goal.id)}>
                     Deposit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GoalList;