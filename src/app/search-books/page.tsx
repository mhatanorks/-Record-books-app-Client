/* eslint-disable @next/next/no-img-element */

import React, { Suspense } from "react";
import Search from "../components/ui/SearchBooks/Search";
import Results from "../components/ui/SearchBooks/Results";
import Skeletons from "../components/ui/SearchBooks/Skeleton";

const SearchBooks = ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  console.log(query);

  return (
    <section className="max-w-4xl m-auto">
      <Search />
      <Suspense key={query + currentPage} fallback={<Skeletons />}>
        <Results query={query} currentPage={currentPage} />
      </Suspense>
      {/* 
      {searchError && <p>エラーが発生しました。</p>}
      {resultNull && <p>検索結果はありません。他のワードで検索してみてね。</p>}
       */}
    </section>
  );
};

export default SearchBooks;
