import Link from "next/link";
import WebSearchResults from "@/components/WebSearchResults";


export default async function WebSearchPage({ searchParams }) {

  const startIndex = searchParams.start || '1';
  await new Promise((resolve) => setTimeout(resolve,1000));
  const searchTerm = searchParams.searchTerm; // ✅ Use dot notation for plain object

  if (!searchTerm) {
    return <div>Please enter a search term.</div>;
  }

  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchTerm}&start=${startIndex}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data = await response.json();
  const results = data.items;

  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">
          No results found for {searchTerm}
        </h1>
        <p className="text-lg">
          Try searching the web or images for something else{" "}
          <Link href="/" className="text-blue-500">
            Home
          </Link>
        </p>
      </div>
    );
  }

  return <WebSearchResults results={data} />;
}
