import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MinigameProgress {
    completedQuestions: number[];
    currentQuestionIndex: number;
    totalCompleted: number;
}

interface GlobalProgressContextType {
    saveProgressToServer: () => Promise<boolean>;
    loadProgressFromServer: () => Promise<void>;
}

const GlobalProgressContext = createContext<GlobalProgressContextType | undefined>(undefined);

export const GlobalProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const loadProgressFromServer = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');

            if (!authToken || !userData) {
                console.log('No hay sesión activa, limpiando progreso local');
                // Limpiar progreso local si no hay sesión
                localStorage.removeItem('minigameProgress');
                localStorage.removeItem('minigame2Progress');
                localStorage.removeItem('minigame3Progress');
                setIsLoading(false);
                return;
            }

            const parsedUserData = JSON.parse(userData);
            const userId = parsedUserData.id;

            console.log('Cargando progreso para usuario ID:', userId);

            const response = await fetch(`http://localhost:5000/api/progress/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Progreso cargado desde servidor:', data);

                // Limpiar progreso anterior primero
                localStorage.removeItem('minigameProgress');
                localStorage.removeItem('minigame2Progress');
                localStorage.removeItem('minigame3Progress');

                // Cargar progreso del usuario actual
                if (data.data) {
                    if (data.data.minigame1Progress) {
                        localStorage.setItem('minigameProgress', JSON.stringify(data.data.minigame1Progress));
                    }
                    if (data.data.minigame2Progress) {
                        localStorage.setItem('minigame2Progress', JSON.stringify(data.data.minigame2Progress));
                    }
                    if (data.data.minigame3Progress) {
                        localStorage.setItem('minigame3Progress', JSON.stringify(data.data.minigame3Progress));
                    }
                    console.log('✅ Progreso específico del usuario cargado');
                } else {
                    console.log('Usuario sin progreso, comenzando desde cero');
                }
            }
        } catch (error) {
            console.error('Error al cargar progreso desde servidor:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveProgressToServer = async (): Promise<boolean> => {
        try {
            const authToken = localStorage.getItem('authToken');
            const userData = localStorage.getItem('userData');

            if (!authToken || !userData) {
                console.error('No hay sesión activa');
                return false;
            }

            const parsedUserData = JSON.parse(userData);
            const userId = parsedUserData.id;

            // Leer progreso directamente desde localStorage
            const minigame1ProgressRaw = localStorage.getItem('minigameProgress');
            const minigame2ProgressRaw = localStorage.getItem('minigame2Progress');
            const minigame3ProgressRaw = localStorage.getItem('minigame3Progress');

            console.log('=== Leyendo desde localStorage ===');
            console.log('minigame1Progress RAW:', minigame1ProgressRaw);
            console.log('minigame2Progress RAW:', minigame2ProgressRaw);
            console.log('minigame3Progress RAW:', minigame3ProgressRaw);

            const minigame1Progress = minigame1ProgressRaw ? JSON.parse(minigame1ProgressRaw) : null;
            const minigame2Progress = minigame2ProgressRaw ? JSON.parse(minigame2ProgressRaw) : null;
            const minigame3Progress = minigame3ProgressRaw ? JSON.parse(minigame3ProgressRaw) : null;

            console.log('=== Progreso parseado ===');
            console.log('minigame1Progress:', minigame1Progress);
            console.log('minigame2Progress:', minigame2Progress);
            console.log('minigame3Progress:', minigame3Progress);

            // Verificar que al menos uno tenga progreso (completedQuestions no vacío)
            const hasProgress = (
                (minigame1Progress && minigame1Progress.completedQuestions && minigame1Progress.completedQuestions.length > 0) ||
                (minigame2Progress && minigame2Progress.completedQuestions && minigame2Progress.completedQuestions.length > 0) ||
                (minigame3Progress && minigame3Progress.completedQuestions && minigame3Progress.completedQuestions.length > 0)
            );

            console.log('=== Verificación de progreso ===');
            console.log('¿Tiene progreso?:', hasProgress);

            if (!hasProgress) {
                console.warn('No hay progreso real para guardar (completedQuestions vacío)');
                return false;
            }

            const payload = {
                userId,
                minigame1Progress,
                minigame2Progress,
                minigame3Progress,
            };

            console.log('=== Guardando en servidor ===');
            console.log('Payload:', JSON.stringify(payload, null, 2));

            const response = await fetch('http://localhost:5000/api/save-progress', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                console.log('✅ Progreso guardado exitosamente:', data);
                return true;
            } else {
                console.error('❌ Error al guardar:', data);
                return false;
            }
        } catch (error) {
            console.error('❌ Error al guardar progreso:', error);
            return false;
        }
    };

    // Cargar progreso SOLO si ya hay una sesión activa y no se ha cargado
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const hasLoadedProgress = sessionStorage.getItem('progressLoaded');
        
        if (authToken && !hasLoadedProgress) {
            setIsLoading(true);
            loadProgressFromServer();
            sessionStorage.setItem('progressLoaded', 'true');
        }
    }, []);

    if (isLoading) {
        return <div>Cargando progreso...</div>;
    }

    return (
        <GlobalProgressContext.Provider
            value={{
                saveProgressToServer,
                loadProgressFromServer,
            }}
        >
            {children}
        </GlobalProgressContext.Provider>
    );
};

export const useGlobalProgress = () => {
    const context = useContext(GlobalProgressContext);
    if (!context) {
        throw new Error('useGlobalProgress debe usarse dentro de GlobalProgressProvider');
    }
    return context;
};
