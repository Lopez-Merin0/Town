import React from 'react';

interface NPCDialoguePopupProps {
    npcName: string;
    text: string;
    image: string;
    onClose: () => void;
}

const NPCDialoguePopup: React.FC<NPCDialoguePopupProps> = ({ npcName, text, image, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div 
                className="kawaii-popup p-6 rounded-lg shadow-lg"
                style={{
                    backgroundColor: '#fefefe',
                    border: '5px solid #6495ed',
                    boxShadow: '0 8px 0 0 #add8e6',
                    maxWidth: '500px',
                    width: '90%'
                }}
            >
                <h2 
                    className="text-2xl font-bold mb-4 text-center"
                    style={{ color: '#ff69b4' }}
                >
                    {npcName}
                </h2>
                
                <div className="mb-4 flex justify-center">
                    <img 
                        src={image} 
                        alt="Dialogue"
                        style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            borderRadius: '10px',
                            border: '3px solid #add8e6'
                        }}
                    />
                </div>
                
                <p 
                    className="text-lg mb-6 text-center"
                    style={{ color: '#333333' }}
                >
                    {text}
                </p>
                
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="kawaii-button py-2 px-6 font-bold"
                        style={{
                            backgroundColor: '#ff69b4',
                            color: 'white',
                            border: '3px solid #e04e9e',
                        }}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NPCDialoguePopup;
