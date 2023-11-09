/* eslint-disable @next/next/no-async-client-component */
"use client";
import { fetchRecordsBooks } from "@/app/lib/data";
import { Suspense, useState } from "react";
import Skeletons from "../SearchBooks/Skeleton";
import { useEffect } from "react";
import RecordsList from "./RecordsList";
import NavButton from "./NavButton";

const Dashboard = ({ session }: { session: any }) => {
  const email = session?.user.email;
  const [status, setStatus] = useState<string>("Record");
  const [deletionCount, setDeletionCount] = useState<number>(0);
  const [records, setRecords] = useState<any>({
    favoriteRecords: [],
    readRecords: [],
  });
  console.log(status);
  useEffect(() => {
    async function fetchAndSetRecords() {
      const fetchedRecords = await fetchRecordsBooks(email);
      const favoriteRecords = fetchedRecords.filter(
        (record: { status: string }) => record.status === "favorite"
      );
      const readRecords = fetchedRecords.filter(
        (record: { status: string }) => record.status === "record"
      );

      setRecords({ favoriteRecords, readRecords });
    }
    fetchAndSetRecords();
  }, [email, deletionCount]);

  // 削除操作後に deletionCount を更新する関数
  const handleDelete = () => {
    setDeletionCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <nav className="flex justify-center mb-10">
        <NavButton status={status} setStatus={setStatus} nav="Record" />
        <NavButton status={status} setStatus={setStatus} nav="Favorite" />
      </nav>
      {status == "Record" ? (
        <Suspense fallback={<Skeletons />}>
          <RecordsList
            records={records.readRecords}
            handleDelete={handleDelete}
          />
        </Suspense>
      ) : (
        <RecordsList
          records={records.favoriteRecords}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Dashboard;
