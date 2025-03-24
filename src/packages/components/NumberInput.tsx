"use client"

import { useState, useRef, useEffect } from "react";

export interface NumberInputProps {
    value?: number;
    onChange?: (value: number) => void;
    min?:number;
}

export const NumberInput = (props: NumberInputProps) => {
    const { value: valueProps, onChange, min=0 } = props;
    const [value, setValue] = useState(valueProps || 0);
    const incrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const decrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (onChange) {
            onChange(value)
        }
    }, [value]);

    const handleAddOne = (e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) e.preventDefault();
        if (value === MAX) return;
        setValue(prevValue => prevValue + 1);
    };

    const handleSubstractOne = (e?: React.MouseEvent<HTMLButtonElement>) => {
        if (e) e.preventDefault();
        setValue(prevValue => Math.max(min, prevValue - 1));
    };

    const startIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        incrementTimeoutRef.current = setTimeout(function increment() {
            handleAddOne();
            incrementTimeoutRef.current = setTimeout(increment, 100);
        }, 500);
    };

    const startDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        decrementTimeoutRef.current = setTimeout(function decrement() {
            handleSubstractOne();
            decrementTimeoutRef.current = setTimeout(decrement, 100);
        }, 500);
    };

    const stopIncrement = () => {
        if (incrementTimeoutRef.current) {
            clearTimeout(incrementTimeoutRef.current);
            incrementTimeoutRef.current = null;
        }
    };

    const stopDecrement = () => {
        if (decrementTimeoutRef.current) {
            clearTimeout(decrementTimeoutRef.current);
            decrementTimeoutRef.current = null;
        }
    };


    const MAX = 99
    const MIN = min

    return (
        <div className="flex w-min flex-row items-center justify-center rounded-xl bg-neutral-900 p-1">
            <button
                onClick={(e) => {
                    handleSubstractOne(e);
                }}
                onMouseDown={(e) => {
                    startDecrement(e);
                }}
                onMouseUp={stopDecrement}
                onMouseLeave={stopDecrement}
                className="flex size-7 items-center justify-center rounded-lg bg-neutral-800 p-4 text-lg text-neutral-200"
            >
                -
            </button>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    if (
                        Number.isInteger(parseInt(e.target.value)) &&
                        parseInt(e.target.value) <= MAX && 
                        parseInt(e.target.value) >= MIN
                    ) {
                        setValue(parseInt(e.target.value));
                    }
                }}
                className="w-8 border-none bg-transparent text-center text-neutral-200 focus:outline-none focus:ring-0"
            />
            <button
                onClick={(e) => {
                    handleAddOne(e);
                }}
                onMouseDown={(e) => {
                    startIncrement(e);
                }}
                onMouseUp={stopIncrement}
                onMouseLeave={stopIncrement}
                className="flex size-7 items-center justify-center rounded-lg bg-neutral-800 p-4 text-lg text-neutral-200"
            >
                +
            </button>

        </div>
    );
};