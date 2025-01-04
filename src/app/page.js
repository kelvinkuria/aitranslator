"use client";

import { useState } from "react";
import { translate } from "@/app/actions/translate";
import { Dropdown } from "@/app/components/dropdown";
import VoiceRecorder from "@/app/components/voice-recorder";
import SaveBtn from "@/app/components/save-translation-btn";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
  { value: "ar", label: "Arabic" },
  { value: "hi", label: "Hindi" },
  { value: "ja", label: "Japanese" },
  { value: "ru", label: "Russian" },
  { value: "pt", label: "Portuguese" },
  { value: "sw", label: "Swahili" },
  { value: "it", label: "Italian" },
  { value: "ko", label: "Korean" },
  { value: "nl", label: "Dutch" },
  { value: "tr", label: "Turkish" },
  { value: "vi", label: "Vietnamese" },
  { value: "th", label: "Thai" },
];

export default function Home() {
  const [languageFrom, setLanguageFrom] = useState("en");
  const [languageTo, setLanguageTo] = useState("es");
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const onSave = () => setIsSaved(true);
  const handleLanguageFromChange = (value) => setLanguageFrom(value);
  const handleLanguageToChange = (value) => setLanguageTo(value);
  const handleInputChange = (e) => setInputText(e.target.value);
  const handleInputSet = async (value) => {
    setInputText(value);
    const formData = new FormData();
    formData.append("text", value);
    formData.append("languageTo", languageTo);
    formData.append("languageFrom", languageFrom);
    const translation = await translate(formData);
    setTranslatedText(translation.translation);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", inputText);
    formData.append("languageTo", languageTo);
    formData.append("languageFrom", languageFrom);
    const { translation } = await translate(formData);
    setTranslatedText(translation);
    if (isSaved) setIsSaved(false);
  };

  return (
    <section className="py-12 px-4 sm:px-8 bg-black text-gray-100 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-amber-400 sm:text-6xl">
          Break Barriers, <span className="text-gray-100">Effortlessly</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400 sm:text-xl">
          Experience seamless translation with a sleek and modern interface. Type, speak, or paste your text, and let the magic happen!
        </p>
      </div>
      <div className="bg-gray-900 shadow-2xl rounded-lg p-8 max-w-4xl mx-auto">
        <form className="space-y-8" onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Dropdown
                name="languageFrom"
                value={languageFrom}
                options={languageOptions}
                onChange={handleLanguageFromChange}
                label="Translate From"
              />
              <textarea
                className="w-full h-40 border border-gray-700 rounded-lg p-4 text-gray-100 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                placeholder="Enter your text here..."
                value={inputText}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-4">
              <Dropdown
                name="languageTo"
                value={languageTo}
                options={languageOptions}
                onChange={handleLanguageToChange}
                label="Translate To"
              />
              <textarea
                className="w-full h-40 border border-gray-700 bg-gray-800 rounded-lg p-4 text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Your translation will appear here."
                value={translatedText}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-amber-400 text-black font-medium hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Translate
            </button>
            {languageFrom === "en" && (
              <VoiceRecorder handleSetText={handleInputSet} />
            )}
            <SaveBtn
              sourceLan={languageFrom}
              targetLan={languageTo}
              sourceText={inputText}
              targetText={translatedText}
              onHandleSave={onSave}
              isSaved={isSaved}
            />
          </div>
        </form>
      </div>
    </section>
  );
}
