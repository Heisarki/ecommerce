'use client'
import { useEffect, useState } from 'react'

export default function useAnimationTyping(
    text = "search",
    value = "",
) {
    text = text + " "
    const [typingText, setTypingText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (value) {
            setTypingText("")
            setCurrentIndex(0)
            return;
        }
        let delay = 70
        if (currentIndex === text.length - 1)
            delay = 3000
        const timeout = setTimeout(() => {
            setTypingText(prevText => prevText + text[currentIndex]);
            setCurrentIndex(prevIndex => prevIndex + 1);
        }, delay);
        if (currentIndex === text.length) {
            setCurrentIndex(0)
            setTypingText("")
        }
        return () => clearTimeout(timeout);
    }, [currentIndex, value]);
    return [typingText]
}
