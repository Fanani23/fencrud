import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import TableGood from "../../components/TableGood";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import Search from "../../components/Search";
import ModalCreateGood from "../../components/ModalCreateGood";
import ModalEditGood from "../../components/ModalEditGood";
import ModalDeleteGood from "../../components/ModalDeleteGood";
import Swal from "sweetalert2";
import Pagination from "../../components/Pagination";

const Main = () => {
  const [tableData, setTableData] = useState([]);

  const [search, setSearch] = useState("");
  const [sortby, setSortby] = useState("name");
  const [sortorder, setSortorder] = useState("desc");
  const [limit, setLimit] = useState("5");
  const [page, setPage] = useState("1");
  const [totalResult, setTotalResult] = useState("");

  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [selling, setSelling] = useState("");
  const [purchase, setPurchase] = useState("");
  const [photo, setPhoto] = useState("");

  const [idEdit, setIdEdit] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [stockEdit, setStockEdit] = useState("");
  const [sellingEdit, setSellingEdit] = useState("");
  const [purchaseEdit, setPurchaseEdit] = useState("");
  const [photoEdit, setPhotoEdit] = useState("");

  const [idDelete, setIdDelete] = useState("");
  const [nameDelete, setNameDelete] = useState("");

  const [openAddGood, setOpenAddGood] = useState(false);
  const closeAddGoodModal = () => setOpenAddGood(false);
  const openAddGoodModal = () => setOpenAddGood(true);

  const [openEditGood, setOpenEditGood] = useState(false);
  const closeEditGoodModal = () => setOpenEditGood(false);
  const openEditGoodModal = () => setOpenEditGood(true);

  const [openDeleteGood, setOpenDeleteGood] = useState(false);
  const closeDeleteGoodModal = () => setOpenDeleteGood(false);
  const openDeleteGoodModal = () => setOpenDeleteGood(true);

  const token = localStorage.getItem("token");

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async (url) => {
    try {
      const { data } = await axios.get(url, auth);
      setTableData(data.data.result);
      console.log(data.data);
      setTotalResult(data.data.pagination.totalData);
    } catch (err) {
      console.log("Fetching data error", err);
    }
  };

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_KEY}/goods`;
    if (limit !== "5") {
      url = `${url}?limit=${limit}`;
    } else {
      url = `${url}?limit=5`;
    }
    if (search !== "") {
      url = `${url}&search=${search}`;
    }
    if (sortby !== "name") {
      url = `${url}&sortby=${sortby};`;
    } else {
      url = `${url}&sortby=name`;
    }
    if (sortorder !== "desc") {
      url = `${url}&sortorder=${sortorder}`;
    } else {
      url = `${url}&sortorder=desc`;
    }
    if (page !== "1") {
      url = `${url}&page=${page}`;
    }
    fetchData(url);
  }, [limit, search, sortorder, sortby, page]);

  const showTablePage = (page) => {
    setPage(page);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("stock", stock);
    formData.append("selling", selling);
    formData.append("purchase", purchase);
    formData.append("photo", photo);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_KEY}/goods`,
        formData,
        auth
      );
      Swal.fire(
        "Success",
        "Adding data success, if data didn't match you must refresh your browser",
        "success"
      );
    } catch (err) {
      if (err && err.response?.status === 400) {
        Swal.fire(
          "Warning",
          "Adding data failed, name product is already exist. Try to add product with another unique name",
          "error"
        );
      } else {
        Swal.fire(
          "Warning",
          "Adding data failed, check your input value again",
          "error"
        );
      }
    }
  };

  const prepareEdit = (item) => {
    setIdEdit(item.id);
    setNameEdit(item.name);
    setStockEdit(item.stock);
    setSellingEdit(item.selling);
    setPurchaseEdit(item.purchase);
    setPhotoEdit(item.photo);
    fetchEditData(item);
    setOpenEditGood(true);
  };

  const fetchEditData = async (item) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}/goods/good/${item.id}`,
        auth
      );
      setIdEdit(data.data[0].id);
      setNameEdit(data.data[0].name);
      setStockEdit(data.data[0].stock);
      setSellingEdit(data.data[0].selling);
      setPurchaseEdit(data.data[0].purchase);
      setPhotoEdit(data.data[0].photo);
    } catch (err) {
      console.log("Fetch edit data error", err);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", idEdit);
    formData.append("name", nameEdit);
    formData.append("stock", stockEdit);
    formData.append("selling", sellingEdit);
    formData.append("purchase", purchaseEdit);
    formData.append("photo", photoEdit);
    try {
      axios.put(
        `${process.env.REACT_APP_API_KEY}/goods/${idEdit}`,
        formData,
        auth
      );
      Swal.fire(
        "Success",
        "Editing data success, if data didn't match you must refresh your browser",
        "success"
      );
    } catch (err) {
      Swal.fire(
        "Warning",
        "Editing data failed, check your input value again",
        "error"
      );
    }
  };

  const prepareDelete = (id) => {
    setIdDelete(id);
    fetchDeleteData(id);
    setOpenDeleteGood(true);
  };

  const fetchDeleteData = async (id) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}/goods/good/${id}`,
        auth
      );
      setNameDelete(data.data[0].name);
    } catch (err) {
      console.log("Fetch delete data", err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/goods/${idDelete}`,
        auth
      );
      Swal.fire(
        "Success",
        "Deleting data success, if data didn't match you must refresh your browser"
      );
    } catch (err) {
      console.log("Deleting data error", err);
      Swal.fire("Warning", "Deleting data failed", "error");
    }
  };

  return (
    <div className="w-full flex flex-col h-full overflow-auto scrollbar-shown">
      <Navbar className="bg-orange-400" />
      <div className="bg-white w-full mt-24 p-5 rounded-lg overflow-hidden flex h-full flex-col">
        <div className="flex justify-between">
          <Search
            textColor={"text-black"}
            bgColor={"bg-orange-400"}
            placeholder={"Search by product name..."}
            searchValue={search}
            setSearchValue={setSearch}
          />
          <button
            type="submit"
            className="flex flex-row ml-2 items-center sm:ml-auto h-10 px-3 py-2 bg-orange-400 rounded-lg whitespace-nowrap"
            onClick={openAddGoodModal}
          >
            <MdAdd className="text-white mr-2" />
            <span className="text-white">Add Product</span>
            <ModalCreateGood
              show={openAddGood}
              close={closeAddGoodModal}
              nameValue={name}
              setNameValue={setName}
              stockValue={stock}
              setStockValue={setStock}
              sellingValue={selling}
              setSellingValue={setSelling}
              purchaseValue={purchase}
              setPurchaseValue={setPurchase}
              photoValue={photo}
              setPhotoValue={setPhoto}
              submit={handleCreate}
            />
          </button>
        </div>
      </div>
      {totalResult ? (
        <>
          <div className="h-full mt-4 mb-3 overflow-y-auto scrollbar-shown">
            <TableGood
              tableData={tableData}
              editRow={prepareEdit}
              deleteRow={prepareDelete}
            />
            <ModalEditGood
              show={openEditGood}
              close={closeEditGoodModal}
              idEditValue={idEdit}
              setIdEditValue={setIdEdit}
              nameEditValue={nameEdit}
              setNameEditValue={setNameEdit}
              stockEditValue={stockEdit}
              setStockEditValue={setStockEdit}
              sellingEditValue={sellingEdit}
              setSellingEditValue={setSellingEdit}
              purchaseEditValue={purchaseEdit}
              setPurchaseEditValue={setPurchaseEdit}
              photoEditValue={photoEdit}
              setPhotoEditValue={setPhotoEdit}
              submit={handleEdit}
            />
            <ModalDeleteGood
              show={openDeleteGood}
              close={closeDeleteGoodModal}
              nameDeleteValue={nameDelete}
              submit={handleDelete}
            />
          </div>
          <Pagination
            maxPage={Math.ceil(totalResult / limit)}
            currentPage={page}
            showTablePage={showTablePage}
          />
        </>
      ) : (
        <p className="w-full text-black">Waiting for Data</p>
      )}
    </div>
  );
};

export default Main;
