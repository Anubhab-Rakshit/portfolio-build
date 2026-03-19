import { useEffect, useState } from 'react';

export function useKonamiCode(onUnlock: () => void) {
    // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === konamiSequence[index]) {
                if (index === konamiSequence.length - 1) {
                    onUnlock();
                    setIndex(0);
                } else {
                    setIndex(index + 1);
                }
            } else {
                setIndex(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [index, onUnlock, konamiSequence]);
}
