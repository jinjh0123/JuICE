export const Section = (props: {
    title: string
    remove_top_padding?: boolean
    className?: string
    children?: any
}) => {
    return <div className={`${props.remove_top_padding === true ? "" : "pt-14"} pb-8 ${props.className}`}>
        <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-8 rounded-full bg-red-300"/>
            <div className="text-3xl font-normal text-teal-600">{props.title}</div>
        </div>
        {props.children}
    </div>
}
