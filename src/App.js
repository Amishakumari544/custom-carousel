import React from 'react';
import './style.css';
import Carousel from './Carousel';
import React, { Suspense } from "react";
export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <Suspense fallback={<div className="hidden">Loading...</div>}>
        <Carousel />
      </Suspense>
    </div>
  );
}
