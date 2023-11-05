import { useState } from "react";
import "./App.css";

function App() {
  const images = [
    "/images/image-1.webp",
    "/images/image-2.webp",
    "/images/image-3.webp",
    "/images/image-4.webp",
    "/images/image-5.webp",
    "/images/image-6.webp",
    "/images/image-7.webp",
    "/images/image-8.webp",
    "/images/image-9.webp",
    "/images/image-10.jpeg",
    "/images/image-11.jpeg",
  ];

  const [clickedItems, setClickedItems] = useState([]);
  const deleteItem = (img) => {
    if (clickedItems.includes(img)) {
      // Item is already in the array, so remove it
      const updatedItems = clickedItems.filter((item) => item !== img);
      setClickedItems(updatedItems);
    } else {
      setClickedItems([...clickedItems, img]);
    }
  };

  const [array1, setArray1] = useState(images);
  const removeItem = (clickedItems) => {
    const filteredItems = filterItemsByIndexes(array1, clickedItems);
    setArray1(filteredItems);
    setClickedItems([]);
    console.log(clickedItems);
  };

  function filterItemsByIndexes(items, indexesToExclude) {
    return items.filter(
      (item, index) => indexesToExclude.indexOf(index) === -1
    );
  }

  // const reorderArray = (oldIndex, newIndex) => {
  //   const updatedArray = [...array1];
  //   const [movedItem] = updatedArray.splice(oldIndex, 1);
  //   updatedArray.splice(newIndex, 0, movedItem);
  //   setArray1(updatedArray);
  // };
  console.log(array1);
  // const changeImage = (i) => {
  //   console.log(i);
  // };
  const [draggedIndex, setDraggedIndex] = useState(null); // Track the source index

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    console.log(index);
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newIndex) => {
    e.preventDefault();
    console.log(newIndex);
    const oldIndex = draggedIndex; // Get the source index
    reorderArray(oldIndex, newIndex);
  };

  const reorderArray = (oldIndex, newIndex) => {
    const updatedArray = [...array1];
    const movedItem = updatedArray[oldIndex];
    updatedArray[oldIndex] = updatedArray[newIndex];
    updatedArray[newIndex] = movedItem;
    setArray1(updatedArray);
  };
  return (
    <div>
      {clickedItems.length !== 0 && (
        <div className="flex justify-evenly">
          <div>
            <p>You have Selected {clickedItems.length} items</p>
          </div>
          <div>
            <button
              onClick={() => removeItem(clickedItems)}
              className="text-red-600"
            >
              Delete File
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-5 gap-2 w-[80%] h-1/2">
        {array1.map((img, i) => (
          <div
            key={i}
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, i)}
            draggable
            className={`border border-solid border-black ${
              i === 0 ? "row-span-2" : ""
            } ${i === 0 ? "col-span-2" : ""}`}
          >
            <input
              onClick={() => deleteItem(i)}
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              value="Bike"
            ></input>
            <img src={img} alt="jjj"></img>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
