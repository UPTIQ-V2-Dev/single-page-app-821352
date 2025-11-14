import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
    threshold?: number;
    rootMargin?: string;
}

export const useIntersectionObserver = ({
    threshold = 0.1,
    rootMargin = '0px',
}: UseIntersectionObserverProps = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting && !hasIntersected) {
                    setHasIntersected(true);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(target);

        return () => {
            observer.unobserve(target);
        };
    }, [threshold, rootMargin, hasIntersected]);

    return { targetRef, isIntersecting, hasIntersected };
};