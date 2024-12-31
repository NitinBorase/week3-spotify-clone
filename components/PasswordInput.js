const PasswordInput = ({label, placeholder, className, value, setValue}) => {
    return (
    <div className={`textInputDiv flex flex-col space-y-2 ${className}`}>
        <label for="label" className="text-sm font-semibold">
            {label}
        </label>
        <input 
        type="password" 
        placeholder={placeholder} 
        className="border border-solid border-gray-400 rounded-md w-80 h-10 p-2 placeholder-grey-600"
        id={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        />
    </div>)
};

export default PasswordInput;