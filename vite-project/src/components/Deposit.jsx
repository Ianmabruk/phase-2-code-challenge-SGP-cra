import React, { useState, useEffect } from "react";

function Deposit({ goals, onDeposit, defaultGoalId = "" }) {
  const [goalId, setGoalId] = useState(defaultGoalId);
  const [amount, setAmount] = useState("");

  // Sync state if defaultGoalId changes
  useEffect(() => {
    setGoalId(defaultGoalId);
  }, [defaultGoalId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalId || !amount) {
      alert("Please select a goal and enter an amount");
      return;
    }

    onDeposit(goalId, amount);
    alert("Deposit successful!");

    setGoalId("");
    setAmount("");
  };

  return (
    <div className="card">
      <h2>Make a Deposit</h2>
      <form onSubmit={handleSubmit}>
        <select value={goalId} onChange={(e) => setGoalId(e.target.value)}>
          <option value="">Select Goal</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
        />
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
}

export default Deposit;