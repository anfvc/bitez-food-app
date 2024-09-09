import { useState, useEffect } from "react";
import { assets } from "../../assets/admin_assets/assets";

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
      body: formData
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
      setImage(false)
    } else {
    }
  }

  return (
    <div className="w-3/6 ml-20 mt-20">
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-52 cursor-pointer"
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
        <div className="w-4/6">
          <p className="">Product Name</p>
          <input
            className="p-6"
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="w-4/6">
          <p>Product Description</p>
          <textarea
            name="description"
            rows="6"
            placeholder="Insert here a product description"
            required
            className="w-full p-6"
            onChange={handleChange}
            value={data.description}
          ></textarea>
        </div>
        <div className="flex gap-24">
          <div>
            <p>Product Category</p>
            <select
              onChange={handleChange}
              className="max-w-fit p-4"
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
              className="max-w-80 p-4"
              type="number"
              name="price"
              placeholder="€20"
            />
          </div>
        </div>
        <button
          className="max-w-80 cursor-pointer p-4 border-none bg-black text-white"
          type="submit"
        >
          CREATE
        </button>
      </form>
    </div>
  );
}

export default Add;
