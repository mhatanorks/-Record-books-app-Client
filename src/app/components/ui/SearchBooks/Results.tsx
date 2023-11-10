/* eslint-disable @next/next/no-img-element */
import { fetchGoogleBooks } from "@/app/lib/data";
import Image from "next/image";
import NoImage from "../../../../../public/NoImages.png";
import RecordButton from "./RecordButton";

const Results = async ({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) => {
  const searchResults = await fetchGoogleBooks(query, currentPage);
  // console.log(searchResults);

  return (
    <>
      {searchResults?.length == 0 && (
        <p className=" text-green-950 text-lg text-center">
          検索結果がありません！
          <br />
          他の単語で調べてみてね！
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {searchResults?.map((result: any) => (
          <div
            key={result.id}
            className="flex flex-col items-center md:flex-row md:items-start"
          >
            <div className="mb-4 md:mb-0 md:mr-4">
              {result.volumeInfo.imageLinks?.smallThumbnail ? (
                <Image
                  src={result.volumeInfo.imageLinks.smallThumbnail}
                  alt={result.volumeInfo.title}
                  width={128}
                  height={193}
                  className="rounded"
                />
              ) : (
                <Image
                  src={NoImage}
                  alt="No image available"
                  width={128}
                  height={193}
                  className="rounded"
                />
              )}
            </div>

            <div className="w-full md:w-64">
              <div className="text-lg font-bold">{result.volumeInfo.title}</div>
              <div className="text-sm text-gray-600">
                {result.volumeInfo.publishedDate}
              </div>
              <div className="flex flex-wrap gap-1">
                {result.volumeInfo.authors?.map((author: any, index: any) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-xs"
                  >
                    {author}
                  </div>
                ))}
              </div>
              <div className="flex justify-center md:justify-start gap-2 mt-4">
                {/* <FavButton result={result} /> */}
                {/* <RecordButton fav={result.volumeInfo} /> */}
                <RecordButton result={result.volumeInfo} />
                <button className="p-2 bg-amber-500 hover:bg-amber-500/90 transition rounded-lg text-xs">
                  <a
                    href={`https://www.amazon.co.jp/s?k=${encodeURIComponent(
                      result.volumeInfo.title
                    )}&i=stripbooks&__mk_ja_JP=カタカナ&crid=20Z9KH2B14U9V&sprefix=${encodeURIComponent(
                      result.volumeInfo.title
                    )},stripbooks,154&ref=nb_sb_noss`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    amazon
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Results;
