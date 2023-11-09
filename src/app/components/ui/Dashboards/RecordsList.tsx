import Image from "next/image";
import NoImage from "../../../../../public/NoImages.png";
import DeleteButton from "./DeleteButton";
import { formatDate } from "@/app/lib/data";

const RecordsList = ({
  records,
  handleDelete,
}: {
  records: any;
  handleDelete: Function;
}) => {
  return (
    <section className="max-w-4xl m-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {records.map((record: any) => (
          <div
            key={record.id}
            className="flex flex-col items-center md:flex-row md:items-start"
          >
            <div className="mb-4 md:mb-0 md:mr-4">
              {record?.thumbnail ? (
                <Image
                  src={record.thumbnail}
                  alt={record.title}
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

            <div className="w-full h-full md:w-64 relative pb-10">
              <div className="text-lg font-bold">{record.title}</div>
              <div className="text-sm text-gray-600">
                {formatDate(record.createdAt)}
              </div>
              <div className="flex flex-wrap gap-1">
                {record.authors?.map((author: any, index: any) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-full px-3 py-1 text-xs"
                  >
                    {author}
                  </div>
                ))}
              </div>
              <div className="flex justify-center md:justify-start gap-2 mt-2 text-sm">
                {record.memo}
              </div>
              <DeleteButton id={record.id} onDeleteSuccess={handleDelete} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecordsList;
