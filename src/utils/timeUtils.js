export const getGreeting = () => {
    const hour = new Date().getHours();

    return hour >= 4 && hour < 11
        ? 'Good Morning'
        : hour >= 11 && hour < 18
            ? 'Good Afternoon'
            : hour >= 18 && hour < 22
                ? 'Good Evening'
                : 'Hello';
};