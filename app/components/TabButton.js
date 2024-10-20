export default function TabButton({ children, onSelect, className }) {
    return (
        <div className='my-3 w-4/5'>
            <button className={`tabs-btn p-4 w-full flex items-center gap-5 ${className}`} onClick={onSelect}>{children}</button>
        </div>
    )
}