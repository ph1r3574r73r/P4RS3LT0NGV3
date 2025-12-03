window.ThemeUtils = {
    toggleTheme(currentTheme) {
        const newTheme = !currentTheme;
        
        if (newTheme) {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        } else {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        }
        
        try {
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        } catch (e) {
            console.warn('Failed to save theme preference:', e);
        }
        
        return newTheme;
    },
    
    initializeTheme() {
        try {
            const saved = localStorage.getItem('theme');
            if (saved === 'light') {
                return false;
            } else if (saved === 'dark') {
                return true;
            }
        } catch (e) {
            console.warn('Failed to load theme preference:', e);
        }
        
        return true;
    }
};

