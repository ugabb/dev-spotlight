// Select.jsx
import React, { useEffect, useRef, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
    label: string;
    registerName: string;
    register: UseFormRegister<FieldValues>;
    options: Array<{ name: string }>;
};

const Select = ({ label, register, registerName, options }: Props) => {
    const [value, setValue] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const suggestions = options.filter((option) =>
        option.name.toLowerCase().includes(value.toLowerCase())
    );

    const autocompleteRef = useRef();

    useEffect(() => {
        const handleClick = (event) => {
            if (autocompleteRef.current && !autocompleteRef.current?.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    const handleChange = value => {
        setValue(value);
    }

    const handleSuggestionClick = (suggestion) => {
        setValue(suggestion);
        setIsDropdownOpen(false);
    }
    console.log(value)
    return (
        <label className='flex flex-col text-mainGray italic'>
            {label}:
            <div className='relative' ref={autocompleteRef}>
                <input
                    type="text"
                    {...register(registerName)}
                    placeholder='Type to search...'
                    value={value}
                    onFocus={() => setIsDropdownOpen(true)}
                    onChange={(e) => handleChange(e.target.value)}
                    className='w-full bg-black rounded-md px-3 py-2 border border-zinc-700 hover:border-mainPurple'
                />
                {isDropdownOpen && (
                    <div className='absolute top-full left-0 bg-white border border-zinc-700 rounded-b-md max-h-32 overflow-y-auto z-10'>
                        {suggestions.map((suggestion) => (
                            <div
                                key={suggestion.name}
                                onClick={() => handleSuggestionClick(suggestion.name)}
                                className='px-3 py-2 cursor-pointer hover:bg-gray-200'
                            >
                                {suggestion.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </label>
    );
};

export default Select;
