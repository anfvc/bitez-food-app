import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function List() {
  const [list, setList] = useState([]);

  const url = "http://localhost:5555";
  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    const response = await fetch(`${url}/api/food/list`);

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      setList(data);
    } else {
      const { error } = await response.json();
      toast.error(error);
    }
  }

  return (
    <div >
      <p>List of Current Foods</p>
      <div className="list-table p-20">
        <div className="list-table-format hidden grid-cols-3 md:grid sm:grid-cols-5 sm:px-10 sm:py-8 items-center gap-32 bg-slate-50 border border-black">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => {
          return (
            <div key={item._id} className="list-table-format grid grid-cols-3 md:grid-cols-5 items-center gap-32 px-12 py-20 border md:first:border-b-0 border-black">
              <img src={`${url}/images/`+item.image} alt="" className="w-full object-cover rounded-lg"/>
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className="flex justify-center cursor-pointer p-2 border border-black max-w-10">X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
