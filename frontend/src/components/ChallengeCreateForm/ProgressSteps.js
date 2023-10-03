import React, { useState } from 'react';
import { ProgressBar } from "react-step-progress-bar";


const ProgressSteps = () => {

  return (
    <ProgressBar
      percent={75}
      filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
    />
  );
};



export default ProgressSteps;