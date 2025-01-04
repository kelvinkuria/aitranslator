import { neon } from "@neondatabase/serverless";
import { auth } from "@clerk/nextjs/server";
import { TranslationCard } from "@/app/components/translation-card";

async function getData(userId) {
  const sql = neon(process.env.DATABASE_URL);
  const response = await sql`
    SELECT 
      source_language, 
      target_language, 
      COUNT(*) AS translation_count,
      ARRAY_AGG(source_text) AS source_texts,
      ARRAY_AGG(translated_text) AS translated_texts
    FROM translations
    WHERE user_id = ${userId}
    GROUP BY source_language, target_language;
  `;
  return response;
}

export default async function Page() {
  const { userId } = await auth();
  const data = await getData(userId);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">TranslateApp</h1>
        
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-400">
          Your Translations
        </h1>
        <p className="text-center text-gray-400 mb-8">
          View your language translations history in a sleek, dark interface.
        </p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((group, index) => (
            <TranslationCard key={index} group={group} />
          ))}
        </div>
      </main>
    </div>
  );
}
