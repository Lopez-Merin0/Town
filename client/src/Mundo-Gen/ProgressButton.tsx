import React, { useState } from 'react';
import ProgressMap from '../components/ProgressMap';

interface ProgressButtonProps {
    disabled?: boolean;
}

const ProgressButton: React.FC<ProgressButtonProps> = ({ disabled = false }) => {
    const [showProgressMap, setShowProgressMap] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowProgressMap(true)}
                className="kawaii-button py-1 px-2 flex items-center space-x-1"
                style={{
                    backgroundColor: '#FFD700',
                    color: '#333',
                    border: '3px solid #FFA500',
                    fontSize: '0.75rem',
                }}
                disabled={disabled}
            >
                <span className="font-bold">PROGRESO</span>
            </button>

            {showProgressMap && <ProgressMap onClose={() => setShowProgressMap(false)} />}
        </>
    );
};

export default ProgressButton;
