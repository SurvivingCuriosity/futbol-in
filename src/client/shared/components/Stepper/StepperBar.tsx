export const StepperBar = ({ progress }: { progress: number }) => {
    return (
        <div
            style={{ width: `${progress}%` }}
            className='absolute left-0 h-full rounded-lg bg-primary transition-all duration-500 ease-in-out'
        ></div>
    );
};