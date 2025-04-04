const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
    return (
        <div className="theme-toggle">
            <label className="switch">
                <input 
                    type="checkbox" 
                    checked={isDarkMode}
                    onChange={() => setIsDarkMode(!isDarkMode)}
                />
                <span className="slider round"></span>
            </label>
            <span>{isDarkMode ? '🌙' : '☀️'}</span>
        </div>
    )
}

export default ThemeToggle