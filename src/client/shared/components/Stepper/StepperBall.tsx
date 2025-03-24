import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface StepperBallProps {
    done: boolean;
    index: number;
    active: boolean;
    isFirst: boolean;
    isLast: boolean;
    onClick: (i:number) => void;
}

export const StepperBall = (props: StepperBallProps) => {

    const { done, isFirst, isLast, active, index, onClick } = props

    return (
        <div
        onClick={()=>onClick(index)}
            className={`${done || active ? 'bg-primary border-primary' : 'bg-neutral-400 border-neutral-400' } ${isFirst ? '-translate-x-1' : isLast ? 'translate-x-1' : ''} relative size-4 rounded-full border-2`}
        >
            {done && <FontAwesomeIcon icon={faCheck} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs"/>}
        </div>
    );
};