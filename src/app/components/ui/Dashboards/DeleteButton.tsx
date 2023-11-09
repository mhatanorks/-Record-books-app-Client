import { deleteRecord } from "@/app/lib/serverActions";
import { TrashIcon } from "@heroicons/react/24/outline";

const DeleteButton = ({
  id,
  onDeleteSuccess,
}: {
  id: string;
  onDeleteSuccess: Function;
}) => {
  const handleDelete = async () => {
    try {
      await deleteRecord(id);
      onDeleteSuccess();
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  return (
    <form action={handleDelete}>
      <button className="rounded-md border p-2 bg-gray-100 hover:bg-gray-300 absolute bottom-0 right-0">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
};

export default DeleteButton;
