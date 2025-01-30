// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        // Check if the click is on the overlay (not on the modal content)
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" 
            onClick={handleOverlayClick} // Add click handler to the overlay
        >
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-white text-3xl hover:text-red-500 transition duration-200 p-2 rounded-full" 
                    aria-label="Close"
                >
                    &times; {/* You can also use an SVG icon here */}
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;