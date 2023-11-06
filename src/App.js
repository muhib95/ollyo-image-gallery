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
  console.log(clickedItems);
  const [array1, setArray1] = useState(images);
  const removeItem = (clickedItems) => {
    const filteredItems = filterItemsByIndexes(array1, clickedItems);
    setArray1(filteredItems);
    setClickedItems([]);
  };

  function filterItemsByIndexes(items, indexesToExclude) {
    return items.filter(
      (item, index) => indexesToExclude.indexOf(index) === -1
    );
  }

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
    const [movedItem] = updatedArray.splice(oldIndex, 1);
    updatedArray.splice(newIndex, 0, movedItem);
    setArray1(updatedArray);
  };
  const [match, setMatch] = useState(20);
  // // // // const [m, setM] = useState(false);
  const hover = (i) => {
    console.log(i);
    setMatch(i);
  };
  const leave = () => {
    // console.log(i);
    setMatch();
  };

  return (
    <div>
      {clickedItems.length !== 0 ? (
        <div className="flex justify-evenly h-11 p-2">
          <div>
            {clickedItems.length > 1 ? (
              <p>{clickedItems.length} Files Selected</p>
            ) : (
              <p>{clickedItems.length} File Selected</p>
            )}
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
      ) : (
        <div className="flex justify-evenly h-11"></div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 w-[80%] h-1/2 m-0 mx-auto">
        {array1.map((img, i) => (
          <div
            onMouseEnter={() => hover(i)}
            onMouseLeave={() => leave()}
            key={i}
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, i)}
            draggable
            className={`border border-solid border-black ${
              i === 0 ? "row-span-2" : ""
            } ${i === 0 ? "col-span-2" : ""} relative`}
          >
            {/*array1.indexOf(array1[i]) === match (array1.indexOf(array1[i]) === clickedItems[i] &&
                clickedItems.length !== 0) clickedItems.includes(i) */}
            {array1.indexOf(array1[i]) === match && (
              <input
                className="absolute top-[24px] left-[14px] z-20 w-[20px] h-[20px]"
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                checked={clickedItems.includes(i)}
                onChange={() => deleteItem(i)}
              ></input>
            )}
            {clickedItems.includes(i) && (
              <input
                className="absolute top-[24px] left-[14px] z-20 w-[20px] h-[20px]"
                type="checkbox"
                id="vehicle1"
                name="vehicle1"
                value="Bike"
                checked={clickedItems.includes(i)}
                onChange={() => deleteItem(i)}
              ></input>
            )}

            <img src={img} alt="jjj" className="w-full h-auto"></img>
          </div>
        ))}
        <div className="bg-white  p-3 border-dashed border-2 border-black">
          <div className="bg-white border    p-4  flex justify-center items-center">
            <label
              htmlFor="upload"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <img className="w-11 h-11" src="/images/new.png" alt="pp"></img>

              <span className="text-black font-medium mt-3">Add Images</span>
            </label>
            <input id="upload" type="file" className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
