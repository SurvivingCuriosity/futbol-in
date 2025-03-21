export const FormField = ({children, inline = false}:{children:React.ReactNode | React.ReactNode[], inline?:boolean}) => {
    return (
        <div className={`flex ${inline ? 'space-x-1 items-center' : 'flex-col space-y-1'} mb-4 w-full`}>
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