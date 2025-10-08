import React, { useState, useRef, useEffect } from 'react';

const DropdownMenu = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button 
                className="dropdown-toggle" 
                onClick={toggleMenu}
            >
                {title}
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {children}
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;