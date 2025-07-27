// Add this somewhere in your App.jsx to test
import React from 'react';
const TestDaisyUI = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">DaisyUI Bumblebee Theme Test</h1>
    
    {/* These should show bumblebee theme colors */}
    <div className="flex gap-4 mb-4">
      <button className="btn btn-primary">Primary Button</button>
      <button className="btn btn-secondary">Secondary Button</button>
      <button className="btn btn-accent">Accent Button</button>
    </div>
    
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>If this card and buttons look yellow/orange, bumblebee theme is working!</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
    
    <div className="alert alert-info mt-4">
      <span>This is an info alert with bumblebee theme</span>
    </div>
  </div>
);
export default TestDaisyUI;
// Add <TestDaisyUI /> to your App component