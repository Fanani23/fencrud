import { MdSearch } from "react-icons/md";

const Search = ({
  textColor,
  bgColor,
  searchValue,
  setSearchValue,
  placeholder,
}) => {
  return (
    <>
      <div className={`flex flex-row ${textColor} relative mb-5`}>
        <label htmlFor="search" className="absolute top-3 left-0">
          <MdSearch className={textColor} />
        </label>
        <input
          className={`border-b-2 ${
            bgColor === "bg-black" ? `border-white` : `border-gray-300`
          } bg-transparent w-full md:w-72 ${textColor} h-10 pl-5 text-sm focus:outline-none`}
          type="search"
          name="search"
          id="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={placeholder}
        />
        <button
          type="submit"
          className={`ml-2 h-10 px-3 py-2 ${
            bgColor === "bg-orange-400" ? `bg-orange-400` : `bg-orange-400`
          } rounded-lg`}
        >
          <MdSearch
            className={
              bgColor === "bg-orange-400" ? `text-white` : `text-white`
            }
          />
        </button>
      </div>
    </>
  );
};

export default Search;
