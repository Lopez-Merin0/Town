import React from 'react';
import { KAWAI_COLORS, KAWAI_FONTS } from './minigame-styles';

interface ExitConfirmationPopupProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ExitConfirmationPopup: React.FC<ExitConfirmationPopupProps> = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        style={{ fontFamily: KAWAI_FONTS.comfortaa, pointerEvents: 'auto' }}>
        <div className="p-6 rounded-xl shadow-2xl text-center relative"
            style={{
                backgroundColor: KAWAI_COLORS.panelLight,
                border: `5px solid ${KAWAI_COLORS.panelBorder}`,
                boxShadow: `0 8px 0 0 ${KAWAI_COLORS.bgDark}`,
                maxWidth: '350px',
                paddingTop: '2rem',
            }}>

            <p className="text-xl font-bold mb-5" style={{ color: KAWAI_COLORS.textDark }}>
                ¿Estás segura de regresar al mapa?
            </p>
            <p className="text-sm mb-6" style={{ color: KAWAI_COLORS.textDark }}>
                Perderás el progreso de tu partida actual.
            </p>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={onConfirm}
                    className="py-2 px-4 font-bold transition-transform transform hover:scale-105"
                    style={{
                        backgroundColor: KAWAI_COLORS.accentPink,
                        color: KAWAI_COLORS.textDark,
                        border: `3px solid ${KAWAI_COLORS.panelBorder}`,
                        boxShadow: `0 4px 0 0 ${KAWAI_COLORS.bgDark}`,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontFamily: KAWAI_FONTS.mali,
                    }}
                >
                    Confirmar
                </button>
                <button
                    onClick={onCancel}
                    className="py-2 px-4 font-bold transition-transform transform hover:scale-105"
                    style={{
                        backgroundColor: KAWAI_COLORS.bgMedium,
                        color: KAWAI_COLORS.textDark,
                        border: `3px solid ${KAWAI_COLORS.panelBorder}`,
                        boxShadow: `0 4px 0 0 ${KAWAI_COLORS.bgDark}`,
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontFamily: KAWAI_FONTS.mali,
                    }}
                >
                    Cancelar
                </button>
            </div>
        </div>
    </div>
);

export default ExitConfirmationPopup;
