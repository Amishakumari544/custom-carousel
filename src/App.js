import React from 'react';
import './style.css';
// import Carousel from './Carousel';
import React, { Suspense, lazy } from 'react';

const Carousel = lazy(() => import('./Carousel'));
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
