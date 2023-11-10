"use client";
import { useCallback, useState } from "react";
import Modal from "./Modal";

const RecordButton = ({ result }: { result: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  // モーダルを開閉する関数
  const toggleModal = useCallback(() => {
    // viewTransitions未対応ブラウザの挙動
    if (!(document as any).startViewTransition) {
      setIsOpen(!isOpen);
      return
    }
    // viewTransitions対応ブラウザの挙動
    (document as any).startViewTransition(async () => {
      setIsOpen(!isOpen);
    });
  }, [isOpen]);

  // モーダル外のクリックを検知する関数
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      if (!(document as any).startViewTransition) {
        setIsOpen(false);
        return;
      }
      (document as any).startViewTransition(async () => {
        setIsOpen(false);
      });
    }
  };

  return (
    <>
      <button
        className="p-2 bg-green-400 rounded-lg text-xs hover:bg-green-400/90 transition"
        onClick={toggleModal}
      >
        Record
      </button>

      {isOpen && (
        <>
          <Modal
            closeModal={closeModal}
            toggleModal={toggleModal}
            result={result}
          />
        </>
      )}
    </>
  );
};

export default RecordButton;
