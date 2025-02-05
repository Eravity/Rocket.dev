
"use client";

import InfoSign from "./InfoSign";

const GoalHeader = () => (
  <div className="flex gap-2">
    <h1 className="font-semibold">Goals</h1>
    <InfoSign info="Here you can see the progress of your daily goals" />
  </div>
);

export default GoalHeader;