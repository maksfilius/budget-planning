export default function TabButton({ children, onSelect }) {
    return (
        <li className='my-3 w-3/5'>
            <button className='tabs-btn w-full' onClick={onSelect}>{children}</button>
        </li>
    )
}