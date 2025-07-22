import React from "react";

function Dashboard({ goals }) {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount);
  const overdueGoals = goals.filter(goal =>
    new Date(goal.deadline) < new Date() && goal.savedAmount < goal.targetAmount
  );
  const activeGoals = goals.filter(goal =>
    new Date(goal.deadline) >= new Date() && goal.savedAmount < goal.targetAmount
  );

  return (
    <div className="dashboard">
      <h2>Progress Overview</h2>
      <p>Total Goals: {goals.length}</p>
      <p>Total Saved: ${totalSaved}</p>
      <p>Completed Goals: {completedGoals.length}</p>
      <p>Overdue Goals: {overdueGoals.length}</p>
    </div>
  );
}

export default Dashboard;