import Link from "next/link";
import ImageSearchResults from "@/components/ImageSearchResults";

export default async function ImageSearchPage({ searchParams }) {
  const startIndex = searchParams.start || "1";
  const searchTerm = searchParams.searchTerm;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!searchTerm) {
    return <div>Please enter a search term.</div>;
  }

  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchTerm}&searchType=image&start=${startIndex}`
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
          No image results found for "{searchTerm}"
        </h1>
        <p className="text-lg">
          Try searching for something else{" "}
          <Link href="/" className="text-blue-500 underline">
            Go Home
          </Link>
        </p>
      </div>
    );
  }

  return <ImageSearchResults results={data} />;
}
