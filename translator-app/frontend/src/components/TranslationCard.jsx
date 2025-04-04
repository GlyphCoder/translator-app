const TranslationCard = ({ text, onTextChange, language, placeholder, isLoading, isOutput }) => {
    return (
        <div className={`translation-card ${isOutput ? 'output' : ''}`}>
            <div className="card-header">
                <span className="language-tag">{language}</span>
                {isLoading && <span className="loading-dots">...</span>}
            </div>
            {isOutput ? (
                <div className="translated-text">
                    {text || placeholder}
                </div>
            ) : (
                <textarea
                    value={text}
                    onChange={onTextChange}
                    placeholder={placeholder}
                    rows="5"
                />
            )}
        </div>
    )
}

export default TranslationCard