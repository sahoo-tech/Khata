import { ANIMATION_DURATION, SPRING_CONFIG, SPRING_SOFT } from '../constants';

// Fade in animation
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: ANIMATION_DURATION.NORMAL },
};

// Slide up animation
export const slideUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -50, opacity: 0 },
    transition: SPRING_CONFIG,
};

// Slide down animation
export const slideDown = {
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 50, opacity: 0 },
    transition: SPRING_CONFIG,
};

// Scale animation
export const scale = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: SPRING_SOFT,
};

// Stagger children animation
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Card hover animation
export const cardHover = {
    rest: {
        scale: 1,
        y: 0,
        transition: SPRING_CONFIG,
    },
    hover: {
        scale: 1.02,
        y: -5,
        transition: SPRING_CONFIG,
    },
};

// Glow animation
export const glowAnimation = {
    animate: {
        boxShadow: [
            '0 0 20px rgba(0, 240, 255, 0.3)',
            '0 0 40px rgba(0, 240, 255, 0.6)',
            '0 0 20px rgba(0, 240, 255, 0.3)',
        ],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

// Modal backdrop animation
export const backdropAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: ANIMATION_DURATION.FAST },
};

// Modal content animation
export const modalAnimation = {
    initial: { scale: 0.9, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    exit: { scale: 0.9, opacity: 0, y: 20 },
    transition: SPRING_CONFIG,
};

// List item animation
export const listItemAnimation = {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
    transition: SPRING_CONFIG,
};

// Number counter animation
export const counterAnimation = (from, to, duration = 1) => ({
    from,
    to,
    duration,
    ease: 'easeOut',
});
