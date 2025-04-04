import { useState, useEffect } from 'react'
import './styles/main.css'
import './styles/lightTheme.css'
import './styles/darkTheme.css'
import { translateText, getLanguages } from './api'
import LanguageSelector from './components/LanguageSelector'
import TranslationCard from './components/TranslationCard'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [text, setText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('hi')
  const [languages, setLanguages] = useState([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchLanguages = async () => {
      const langs = await getLanguages()
      setLanguages(langs)
    }
    fetchLanguages()
  }, [])

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-theme' : 'light-theme'
  }, [isDarkMode])

  const handleTranslate = async () => {
    if (!text.trim()) return
    setIsLoading(true)
    try {
      const result = await translateText(text, sourceLang, targetLang)
      setTranslatedText(result.translatedText)
    } catch (error) {
      console.error('Translation error:', error)
      setTranslatedText('Translation failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setText(translatedText)
    setTranslatedText(text)
  }

  return (
    <div className="app-container">
      <header>
        <h1>LinguaGlass</h1>
        <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      </header>

      <main>
        <div className="language-selectors">
          <LanguageSelector 
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            languages={languages}
            label="From"
          />
          
          <button className="swap-btn" onClick={handleSwapLanguages}>
            ⇄
          </button>
          
          <LanguageSelector 
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            languages={languages}
            label="To"
          />
        </div>

        <div className="translation-cards">
          <TranslationCard
            text={text}
            onTextChange={(e) => setText(e.target.value)}
            language={sourceLang}
            placeholder="Enter text to translate..."
          />
          
          <TranslationCard
            text={translatedText}
            onTextChange={(e) => setTranslatedText(e.target.value)}
            language={targetLang}
            placeholder="Translation will appear here..."
            isLoading={isLoading}
            isOutput
          />
        </div>

        <button 
          className="translate-btn" 
          onClick={handleTranslate}
          disabled={!text.trim() || isLoading}
        >
          {isLoading ? 'Translating...' : 'Translate'}
        </button>
      </main>

      <footer>
        <p>Powered by LibreTranslate API</p>
      </footer>
    </div>
  )
}

export default App