import React from "react";
import GoalItem from "./GoalItem";

function HistoryPage({ goals }) {
  const today = new Date();

  const isCompleted = (goal) => goal.savedAmount >= goal.targetAmount;
  const isOverdue = (goal) =>
    new Date(goal.deadline) < today && !isCompleted(goal);

  const completedGoals = goals.filter(isCompleted);
  const overdueGoals = goals.filter(isOverdue);

  return (
    <div className="p-6">
      <h1> Goal History</h1>

      <section>
        <h2>Completed Goals</h2>
        {completedGoals.length > 0 ? (
          completedGoals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))
        ) : (
          <p>No completed goals yet.</p>
        )}
      </section>

      <section>
        <h2> Overdue Goals</h2>
        {overdueGoals.length > 0 ? (
          overdueGoals.map((goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))
        ) : (
          <p>No overdue goals!</p>
        )}
      </section>
    </div>
  );
}

export default HistoryPage;