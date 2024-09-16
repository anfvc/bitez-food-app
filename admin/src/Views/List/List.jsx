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

  async function removeFood(id) {
    const settings = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/JSON",
      },
    };

    const response = await fetch(`${url}/api/food/delete/${id}`, settings);

    if (response.ok) {
      const data = await response.json();
      setList((data) => data.filter((food) => food._id !== id));
      toast.success("Food has been successfully removed.")
    } else {
      const {error} = await response.json();
      toast.error("Error deleteing food.")
    }

    await getList();
  }

  return (
    <div className="text-center p-12">
      <p>List of Current Foods</p>
      {list.length === 0 ? (
        <p className="text-2xl font-bold">No foods currently</p>
      ) : (
        <div className="w-full list-table p-14">
          <div className="w-full hidden sm:grid sm:grid-cols-5 sm:place-items-center sm:border sm:border-black sm:px-8 sm:py-6 sm:first:border-b-0">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item) => {
            return (
              <div
                key={item._id}
                className="w-full list-table-format grid grid-cols-1 place-content-center gap-4 p-4 sm:grid-cols-5 sm:place-items-center sm:gap-4 sm:px-4 sm:py-12 border border-black sm:first:border-b-0 sm:border-black sm:max-w-screen-lg "
              >
                <img
                  src={`${url}/images/` + item.image}
                  alt=""
                  className="w-full object-cover rounded-lg"
                />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p
                  onClick={() => removeFood(item._id)}
                  className="flex justify-center cursor-pointer p-2 border border-black max-w-10"
                >
                  X
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default List;
