const LanguageSelector = ({ value, onChange, languages, label }) => {
    return (
        <div className="language-selector">
            <label>{label}</label>
            <select value={value} onChange={onChange}>
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default LanguageSelector