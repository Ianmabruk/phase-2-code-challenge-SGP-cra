import React, { useState } from "react";

function AddGoal({ onAdd }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("Savings");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetAmount || !deadline) return;

    onAdd({
      name,
      targetAmount: parseFloat(targetAmount),
      category,
      deadline,
    });

    setName("");
    setTargetAmount("");
    setCategory("Savings");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Goal</h2>
      <input
        type="text"
        placeholder="Goal name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Target amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
        required
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Savings">Savings</option>
        <option value="Emergency">Emergency</option>
        <option value="Investment">Investment</option>
        <option value="Travel">Travel</option>
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default AddGoal;