"use client"
 
import React, { useEffect, useState } from 'react';
import { StepperBall } from './StepperBall';
import { StepperBar } from './StepperBar';

export const Stepper = (
  { steps,
    activeStep,
    setActiveStep
  }: {
    steps: Array<{ t: string, component: React.ReactElement }>,
    activeStep: number,
    setActiveStep: (p: number) => void,
  }) => {    

  const [progress, setProgress] = useState<number>((100 / (steps.length - 1)) * activeStep)
  const [activeInner, setActiveInner] = useState<number>((100 / (steps.length - 1)) * activeStep)

  useEffect(() => {
    const newProgress = (100 / (steps.length - 1)) * activeStep;
    setProgress(newProgress)
    setActiveInner(activeStep)
  }, [activeStep, steps.length])

  const handleBallClick = (stepIndex: number) => {
    setActiveInner(stepIndex)
    setActiveStep(stepIndex)
  }


  return (
    <div className='flex h-full flex-col gap-2 z-3'>

      <p className='block text-3xl font-bold tracking-tighter text-primary'>{steps[activeInner]?.t || ''}</p>
      <div className='relative mb-2 h-2 w-full bg-neutral-400'>
        <StepperBar progress={progress} />
        <div className='absolute left-0 flex h-full w-full flex-row items-center justify-between bg-transparent'>
          {steps.map((s, i) => (
            <StepperBall
              key={s.t}
              index={i}
              isFirst={i === 0}
              isLast={i === steps.length - 1}
              done={activeInner > i}
              active={activeInner === i}
              onClick={() => handleBallClick(i)}
            />
          ))}
        </div>
      </div>


      <ul className='flex w-full flex-col flex-wrap overflow-hidden sm:mt-4'>
        {steps.map((s, i) => (
          <li key={s.t} className='h-full w-full transition-all duration-700' style={{ transform: `translateX(-${activeStep * 100}%)` }}>
            <div className='flex flex-col gap-4 p-2 md:px-4 md:mt-4 lg:mt-8 bg-neutral-950/90 rounded-lg max-w-xl mx-auto w-full'>
              {steps[i].component}
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
};