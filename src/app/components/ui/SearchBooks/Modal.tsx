"use client";

import { createRecord } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import StatusCheck from "./StatusCheck";

const Modal = ({
  closeModal,
  toggleModal,
  result,
}: {
  closeModal: any;
  toggleModal: any;
  result: any;
}) => {
  const memoRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<string>("record");
  const router = useRouter();

  async function createRoute(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isRecordCreated = await createRecord(e, result, memoRef, status);
    if (isRecordCreated) {
      router.push("/"); // ダッシュボードへの遷移
    }
  }
  return (
    // モーダルの背景
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
      onClick={closeModal}
    >
      {/* モーダルコンテンツ */}
      <div className="bg-green-50 rounded-lg m-4 p-6 relative max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Record Form</h3>
        <form onSubmit={(e) => createRoute(e)}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Title:
            </label>
            <div className="text-sm">{result.title}</div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="memo"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Memo:
            </label>
            <textarea
              id="memo"
              className="w-full p-2 border rounded-lg h-36"
              name="memo"
              ref={memoRef}
            ></textarea>
          </div>
          <StatusCheck status={status} setStatus={setStatus} />

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="p-3 m-1 bg-green-400 hover:bg-green-400/90 transition rounded-lg text-sm font-bold text-green-50 shadow-xl cursor-pointer"
            >
              記録する
            </button>
          </div>
        </form>
        <button
          onClick={toggleModal}
          className="p-2 m-1 bg-gray-400 rounded-lg text-xs absolute top-2 right-2"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
