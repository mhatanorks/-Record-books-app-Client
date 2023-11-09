/* eslint-disable react/display-name */
"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import React, { useCallback, useMemo } from 'react';

const Search = React.memo(() => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback(
    useCallback(
      (term) => {
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams();
        params.set("page", "1");
        if (term) {
          params.set("query", term);
        } else {
          params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
      },
      [replace, pathname]
    ),
    600
  );

    // 検索欄の初期値を設定
    const defaultValue = useMemo(() => {
        return searchParams || "";
      }, [searchParams]);
    

  return (
    <div className=" text-center my-5">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        defaultValue={defaultValue.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-96 h-16 mx-3 rounded-lg border-4 border-teal-600 text-3xl p-2 shadow-lg"
        placeholder="Search Books..."
      />
    </div>
  );
});

export default Search;
