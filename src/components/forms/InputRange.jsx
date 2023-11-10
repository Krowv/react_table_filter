export function InputRange({min, max, onChange, value, id, label}){
    return <div>
        <input 
            type="range" 
            id={id}
            className="form-range" 
            value={value}
            min={min}
            max={max}
            onChange={(e)=> onChange(e.target.value)}
        />
        <label htmlFor={id}>{label}</label>
    </div>
}