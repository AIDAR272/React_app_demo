import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Translate.css";

const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "ru", name: "Russian" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "ky", name: "Kyrgyz" }
];

function Translate() {
    const navigate = useNavigate();

    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sourceLang, setSourceLang] = useState("en");
    const [targetLang, setTargetLang] = useState("ru");
    const [showSuccess, setShowSuccess] = useState(false);

    function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/");
    }

    function handleTrainClick() {
        const token = localStorage.getItem("token");
        if(token) navigate("/train");
        else {
            navigate("/login");
            alert("Please log in first!");
        }
    }

    async function handleFavoriteClick() {
        const userId = localStorage.getItem("id");
        if (!userId) {
            alert("Please log in first!");
            return;
        }
        if (!sourceText || !translatedText || translatedText === "Error translating text.") return;

        const url = `https://unolingo-backend-production.up.railway.app/word?user_id=${encodeURIComponent(userId)}&word=${encodeURIComponent(sourceText)}&translation=${encodeURIComponent(translatedText)}`;

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                setShowSuccess(true);
                setSourceText("");
                setTranslatedText("");
                setTimeout(() => setShowSuccess(false), 2000);
            } else {
                alert("Error adding word to favorites!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Network error.");
        }
    }

    useEffect(() => {
        if (!sourceText.trim()) {
            setTranslatedText("");
            return;
        }

        const timeoutId = setTimeout(() => {
            fetchTranslation(sourceText, sourceLang, targetLang);
        }, 800);

        return () => clearTimeout(timeoutId);
    }, [sourceText, sourceLang, targetLang]);

    async function fetchTranslation(textToTranslate, src, tgt) {
        setIsLoading(true);
        try {
            const url = `https://unolingo-backend-production.up.railway.app/translate?word=${encodeURIComponent(textToTranslate)}&source_language=${src}&target_language=${tgt}`;

            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                const data = await response.json();
                setTranslatedText(data.message);
            } else {
                setTranslatedText("Error translating text.");
            }
        } catch (error) {
            setTranslatedText("Network error.", error);
        } finally {
            setIsLoading(false);
        }
    }

    const swapLanguages = () => {
        const oldSrc = sourceLang;
        const oldTgt = targetLang;
        setSourceLang(oldTgt);
        setTargetLang(oldSrc);
        if (translatedText && translatedText !== "Error translating text.") {
            setSourceText(translatedText);
        }
    };

    return (
        <div className="translate-page">
            {showSuccess && (
                <div className="success-toast">
                    Word added to favorites
                </div>
            )}

            <header className="app-header">
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </header>

            <main className="translate-container">
                <div className="language-bar">
                    <select
                        className="lang-select"
                        value={sourceLang}
                        onChange={(e) => setSourceLang(e.target.value)}
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>

                    <button className="swap-btn" onClick={swapLanguages}>⇄</button>

                    <select
                        className="lang-select"
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>

                <div className="translation-box">
                    <div className="text-area-wrapper input-wrapper">
                        <textarea
                            placeholder="Enter text to translate..."
                            value={sourceText}
                            onChange={(e) => setSourceText(e.target.value)}
                            maxLength={5000}
                            autoFocus
                        ></textarea>
                        {sourceText && (
                            <button className="clear-btn" onClick={() => {setSourceText(""); setTranslatedText("");}}>
                                ❌
                            </button>
                        )}
                    </div>

                    <div className="text-area-wrapper output-wrapper">
                        {isLoading ? (
                            <div className="loading-overlay">...</div>
                        ) : (
                            <textarea
                                readOnly
                                value={translatedText}
                                placeholder="Translation"
                            ></textarea>
                        )}
                    </div>
                </div>
            </main>

            <div className="footer-menu">
                <div className="menu-item" onClick={handleTrainClick}>
                    <img src="/train.jpeg" alt="Train" className="menu-icon" />
                    <p>Train</p>
                </div>
                <div className="menu-item" onClick={handleFavoriteClick}>
                    <img src="/favorite.png" alt="Favorite" className="menu-icon" />
                    <p>Favorite</p>
                </div>
            </div>
        </div>
    );
}

export default Translate;