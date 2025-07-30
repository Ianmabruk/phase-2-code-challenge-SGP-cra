import React, { useState, useEffect } from "react";

function Deposit({ goals, onDeposit, onAddGoal, defaultGoalId = "" }) {
  const [goalId, setGoalId] = useState(defaultGoalId);
  const [amount, setAmount] = useState("");
  const [newGoalName, setNewGoalName] = useState("");
  const [creatingNew, setCreatingNew] = useState(false);

  useEffect(() => {
    setGoalId(defaultGoalId);
  }, [defaultGoalId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (creatingNew) {
      if (!newGoalName.trim()) {
        alert("Please enter a name for the new goal");
        return;
      }

      const newGoal = {
        name: newGoalName.trim(),
        targetAmount: 1000,
        savedAmount: parsedAmount,
        category: "Savings",
        deadline: "2025-12-31"
      };

      onAddGoal(newGoal);
      alert("New goal created and deposit added!");

      setNewGoalName("");
      setAmount("");
      setCreatingNew(false);
    } else {
      if (!goalId) {
        alert("Please select a goal");
        return;
      }

      onDeposit(goalId, parsedAmount);
      alert("Deposit successful!");

      setGoalId("");
      setAmount("");
    }
  };

  return (
    <div className="card">
      <h2>{creatingNew ? "Create New Goal + Deposit" : "Make a Deposit"}</h2>
      <form onSubmit={handleSubmit}>
        {!creatingNew ? (
          <>
            <select value={goalId} onChange={(e) => setGoalId(e.target.value)}>
              <option value="">Select Goal</option>
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.name}
                </option>
              ))}
            </select>
            <button type="button" onClick={() => setCreatingNew(true)}>
              + Add New Goal
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="New goal name"
              value={newGoalName}
              onChange={(e) => setNewGoalName(e.target.value)}
            />
            <button type="button" onClick={() => setCreatingNew(false)}>
              Cancel
            </button>
          </>
        )}

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />
        <button type="submit">
          {creatingNew ? "Create & Deposit" : "Deposit"}
        </button>
      </form>
    </div>
  );
}

export default Deposit;
