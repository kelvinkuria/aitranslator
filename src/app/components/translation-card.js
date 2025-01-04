import { ArrowRight } from "lucide-react";

const languageToCountry = {
  en: "🇬🇧", // Updated with better icons
  es: "🇪🇸",
  fr: "🇫🇷",
};

export const TranslationCard = ({ group }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col">
      <div className="flex items-center justify-center mb-4 text-lg font-bold text-yellow-400">
        {group.source_language && group.target_language ? (
          <>
            <span>{languageToCountry[group.source_language]}</span>
            <span className="mx-2">{group.source_language.toUpperCase()}</span>
            <ArrowRight className="mx-2 text-gray-500" />
            <span>{group.target_language.toUpperCase()}</span>
            <span>{languageToCountry[group.target_language]}</span>
          </>
        ) : (
          <span>Unknown Languages</span>
        )}
      </div>
      <div className="flex-grow space-y-4 text-sm text-gray-300">
        {group.source_texts.map((sourceText, index) => (
          <div
            key={`${group.source_language}_${group.target_language}_${index}`}
            className="border-b border-gray-700 pb-4 last:border-b-0"
          >
            <div className="mb-2">
              <h3 className="font-semibold text-yellow-400 mb-1">Source Text</h3>
              <p>{sourceText || "No source text available"}</p>
            </div>
            <div>
              <h3 className="font-semibold text-yellow-400 mb-1">Translation</h3>
              <p>{group.translated_texts[index] || "No translation available"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
