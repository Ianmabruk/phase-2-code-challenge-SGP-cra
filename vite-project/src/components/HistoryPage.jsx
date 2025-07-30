import React from "react";
import GoalItem from "./GoalItem";

function GoalHistory({ goals }) {
  return (
    <div className="card">
      <h2>Goal History</h2>
      {goals.length === 0 ? (
        <p>No goals have been added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Target</th>
              <th>Saved</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr key={goal.id}>
                <td>{goal.name}</td>
                <td>{goal.category}</td>
                <td>${goal.targetAmount}</td>
                <td>${goal.savedAmount}</td>
                <td>{goal.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GoalHistory;
