import { useState, useEffect } from "react";
import { assets } from "../../assets/admin_assets/assets";
import { toast } from "react-toastify";

function Add() {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));
    formData.append("image", image);

    const settings = {
      method: "POST",
      body: formData,
    };

    const response = await fetch(
      "http://localhost:5555/api/food/add",
      settings
    );
    if (response.ok) {
      const data = await response.json();
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(data.message);
      console.log(data.message);
    } else {
      toast.error(data.message)
    }
  }

  return (
    <div className="w-full">
      <form className="w-full p-10 flex flex-col gap-10 sm:p-20" onSubmit={handleSubmit}>
        <div>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-52 cursor-pointer border border-black"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div>
          <p>Product Name</p>
          <input
            className="w-full sm:w-7/12 p-6 border border-black"
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Insert here a product description"
            required
            className="w-full sm:w-7/12 p-4 border border-black"
            onChange={handleChange}
            value={data.description}
          ></textarea>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-14">
          <div>
            <p>Product Category</p>
            <select
              onChange={handleChange}
              className="w-full sm:w-10/12 p-6 border border-black"
              name="category"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwiches</option>
              <option value="Cake">Cakes</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div>
            <p>Product Price</p>
            <input
              onChange={handleChange}
              value={data.price}
              className="w-full sm:min-w-6/12 p-4 border border-black"
              type="number"
              name="price"
              placeholder="€20"
            />
          </div>
        </div>
        <button
          className="w-full sm:w-3/12 cursor-pointer p-4 border-none bg-black text-white text-md"
          type="submit"
        >
          CREATE
        </button>
      </form>
    </div>
  );
}

export default Add;
