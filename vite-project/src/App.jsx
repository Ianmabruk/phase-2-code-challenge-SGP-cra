import React, { useEffect, useState } from "react";
import AddGoal from "./components/AddGoal.jsx";
import Deposit from "./components/Deposit.jsx";
import Dashboard from "./components/Dashboard.jsx";
import GoalList from "./components/GoalList.jsx";
import "./App.css";

function App() {
  const [goals, setGoals] = useState([]);

  //This should be able to Fetch all goals from json-server
  const fetchGoals = () => {
    fetch("http://localhost:3000/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Fetch error:", err));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  //This is supposed to Add new goal
  const addGoal = (goal) => {
    fetch("http://localhost:3000/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...goal, savedAmount: 0 }),
    })
      .then((res) => res.json())
      .then(() => fetchGoals());
  };

  // This should Update goal (edit or deposit)
  const updateGoal = (updatedGoal) => {
    fetch(`http://localhost:3000/goals/${updatedGoal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    })
      .then((res) => res.json())
      .then(() => fetchGoals());
  };

  // This should Delete goal
  const deleteGoal = (id) => {
    fetch(`http://localhost:3000/goals/${id}`, {
      method: "DELETE",
    }).then(() => fetchGoals());
  };

  // Enables Handle deposit
  const makeDeposit = (goalId, amount) => {
    const numericGoalId = Number(goalId); // ✅ Convert goalId to number
    const goal = goals.find((g) => g.id === numericGoalId);
    if (!goal) {
      console.error("Goal not found for deposit:", goalId);
      return;
    }

    const newSavedAmount = goal.savedAmount + parseInt(amount);

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
      <h1>Smart Goal Planner</h1>
      <AddGoal onAdd={addGoal} />
      <Deposit goals={goals} onDeposit={makeDeposit} />
      <Dashboard goals={goals} />
      <GoalList goals={goals} onDelete={deleteGoal} onUpdate={updateGoal} />
    </div>
  );
}

export default App;