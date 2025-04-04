const API_URL = '/api' // Remove the full URL, just use '/api'

export const getLanguages = async () => {
    const response = await fetch(`${API_URL}/languages`)
    return await response.json()
}

export const translateText = async (text, sourceLang, targetLang) => {
    const response = await fetch(`${API_URL}/translate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            text,
            sourceLang,
            targetLang
        })
    })
    return await response.json()
}