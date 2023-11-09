/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useMemo } from "react";


export async function fetchGoogleBooks(query: string, currentPage: number) {
  // useMemoを使用して同じクエリに対する再検索を避ける
  return useMemo(async () => {
    if (!query) return;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?&maxResults=20&q=intitle:${query}&startIndex=${
          (currentPage - 1) * 20
        }`
      );
      return response.data.items || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [query, currentPage]); // 依存配列にqueryとcurrentPageを設定
}

export async function createRecord(
  e: React.FormEvent<HTMLFormElement>,
  result: any,
  memoRef: any,
  status: string
): Promise<boolean> {
  e.preventDefault();
  if (result.authors === undefined) {
    result.authors = ["unknown"];
  }
  console.log(result);
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/create/`,
      {
        title: result.title,
        authors: result.authors,
        thumbnail: result.imageLinks?.smallThumbnail,
        memo: memoRef.current?.value,
        email: "flamberge1191@gmail.com",
        status: status,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true  // クッキーをリクエストに含める
      }
    );
    console.log(response.data);
    return true; // 正常にレスポンスが返された場合は、trueを返す
  } catch (error) {
    console.error(error);
    return false; // エラーが発生した場合は、falseを返す
  }
}

export async function fetchRecordsBooks(email: any) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/list/?email=${email}` ,{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true  // クッキーをリクエストに含める
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("ja-JP", options);
  const formattedDate = formatter
    .format(date)
    .replace(/\//g, "/")
    .replace("日", "")
    .replace("午前", " ")
    .replace("午後", " ")
    .replace(" JST", "");
  return formattedDate;
}
