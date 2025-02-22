export const FormField = ({children}:{children:React.ReactNode | React.ReactNode[]}) => {
    return (
        <div className="flex flex-col space-y-1 mb-4 w-full">
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