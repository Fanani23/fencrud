import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";

const TableGood = ({ tableData, editRow, deleteRow }) => {
  let startNumber = 1;
  return (
    <>
      <table className="font-nunito-sans text-xs w-full overflow-y-auto relative">
        <thead className="sticky top-0">
          <tr className="bg-[#F9F9FC] text-black text-left">
            <th className="p-2 pl-5 whitespace-nowrap">No</th>
            <th className="p-2 whitespace-nowrap">ID</th>
            <th className="p-2 whitespace-nowrap">Name</th>
            <th className="p-2 whitespace-nowrap">Stock</th>
            <th className="p-2 whitespace-nowrap">Selling Price</th>
            <th className="p-2 whitespace-nowrap">Purchase Price</th>
            <th className="p-2 whitespace-nowrap">Photo</th>
            <th className="p-2 whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map((row) => (
              <tr key={row.id} className="even:bg-[#F9F9FC] text-black">
                <td className="p-2 pl-5">{startNumber++}</td>
                <td className="p-2">{row.id}</td>
                <td className="p-2">{row.name}</td>
                <td className="p-2">{row.stock}</td>
                <td className="p-2">{row.selling}</td>
                <td className="p-2">{row.purchase}</td>
                <td className="p-2">
                  {row.image !== null ? (
                    <img
                      src={row.photo}
                      alt=""
                      className="h-[60px] w-[60px] object-cover rounded-md"
                    />
                  ) : (
                    <img
                      src="https://dummyimage.com/50/ffffff/000000.png&text=none"
                      alt="Products"
                      className="h-[60px] w-[60px] object-cover"
                    />
                  )}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => {
                      editRow(row);
                    }}
                  >
                    <MdModeEditOutline className="text-red-500 hover:text-red-800" />
                  </button>
                  <button onClick={() => deleteRow(row.id)}>
                    <MdDeleteOutline className="text-red-500 hover:text-red-800" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default TableGood;
