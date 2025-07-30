// src/App.jsx
import React, { useEffect, useState } from "react";
import AddGoal from "./components/AddGoal.jsx";
import Deposit from "./components/Deposit.jsx";
import Dashboard from "./components/Dashboard.jsx";
import GoalList from "./components/GoalList.jsx";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);

  // Fetch all goals from json-server
  const fetchGoals = () => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  // Add new goal
  const addGoal = (goal) => {
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...goal, savedAmount: 0 }),
    })
      .then((res) => res.json())
      .then(() => fetchGoals());
  };

  // Update goal (edit or deposit)
  const updateGoal = (updatedGoal) => {
    fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    })
      .then((res) => res.json())
      .then(() => fetchGoals());
  };

  // Delete goal
  const deleteGoal = (id) => {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "DELETE",
    }).then(() => fetchGoals());
  };

  // Make a deposit
  const makeDeposit = (goalId, amount) => {
    const numericGoalId = Number(goalId);
    const goal = goals.find((g) => g.id === numericGoalId);
    if (!goal) {
      console.error("Goal not found for deposit:", goalId);
      return;
    }

    const newSavedAmount = goal.savedAmount + parseFloat(amount);

    fetch(`http://localhost:3000/goals/${numericGoalId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ savedAmount: newSavedAmount }),
    })
      .then((res) => res.json())
      .then(() => fetchGoals())
      .catch((err) => console.error("Deposit error:", err));
  };

  return (
    <div className="App">
      <h1>🎯 Smart Goal Planner</h1>
      <AddGoal onAdd={addGoal} />
      <Deposit goals={goals} onDeposit={makeDeposit} />
      <Dashboard goals={goals} />
      <GoalList goals={goals} onDelete={deleteGoal} onUpdate={updateGoal} />
    </div>
  );
}

export default App;
