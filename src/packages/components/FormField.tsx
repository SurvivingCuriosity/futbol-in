export const FormField = ({children, inline = false, className = ""}:{children:React.ReactNode | React.ReactNode[], inline?:boolean, className?:string}) => {
    return (
        <div className={`flex ${inline ? 'space-x-1 items-center' : 'flex-col space-y-1'} mb-4 w-full ${className}`}>
            {children}
        </div>
    )
}

export const FormLabel = ({children}:{children:React.ReactNode}) => {
    return (
        <label className="text-sm">
            {children}
        </label>
    )
}