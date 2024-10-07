export default function TabButton({ children, onSelect, className }) {
    return (
        <li className='my-3 w-3/5'>
            <button className={`tabs-btn w-full ${className}`} onClick={onSelect}>{children}</button>
        </li>
    )
}