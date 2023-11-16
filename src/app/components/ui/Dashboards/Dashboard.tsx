"use client";
import React, { useEffect, useState  } from "react";
import RecordsList from "./RecordsList";
import NavButton from "./NavButton";
import { fetchRecordsBooks } from "@/app/lib/data";

const Dashboard = ({ session }: { session: any }) => {
  const email = session?.user.email;
  const [status, setStatus] = useState("Record");
  const [deletionCount, setDeletionCount] = useState(0);
  const [records, setRecords] = useState<any>({
    favoriteRecords: [],
    readRecords: [],
  });

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

  const handleDelete = () => {
    setDeletionCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      {/* ローディングインジケーター */}
      <nav className="flex justify-center mb-10">
        <NavButton status={status} setStatus={setStatus} nav="Record" />
        <NavButton status={status} setStatus={setStatus} nav="Favorite" />
      </nav>
      {status === "Record" ? (
        <RecordsList
          records={records.readRecords}
          handleDelete={handleDelete}
        />
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
