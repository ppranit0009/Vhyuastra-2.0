import { useState, useEffect } from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export default function GlitchText({ text, className = '' }: GlitchTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    useEffect(() => {
        let interval: any;
        let iteration = 0;

        const glitch = () => {
            interval = setInterval(() => {
                setDisplayText(prev =>
                    prev
                        .split('')
                        .map((_char, index) => {
                            if (index < iteration) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join('')
                );

                if (iteration >= text.length) {
                    clearInterval(interval);
                }

                iteration += 1 / 3;
            }, 30);
        };

        // Trigger glitch on mount and potentially on hover elsewhere
        glitch();

        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className={`glitch-text ${className}`} data-text={text}>
            {displayText}
        </span>
    );
}
