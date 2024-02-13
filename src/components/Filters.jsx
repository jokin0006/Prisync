function Filters({ setData }) {
  return (
    <div className="filter-box flex gap-10 fixed top-5 right-5">
      <div className="filters flex gap-2 items-center">
        Price
        <div
          className="px-5 py-2 border rounded-md bg-black hover:bg-slate-600 cursor-pointer"
          onClick={() => {
            setData((data) => [...data].sort((a, b) => a.price - b.price));
          }}
        >
          Low
        </div>
        <div
          className="px-5 py-2 border rounded-md bg-black hover:bg-slate-600 cursor-pointer"
          onClick={() => {
            setData((data) => [...data].sort((a, b) => b.price - a.price));
          }}
        >
          High
        </div>
      </div>
      <div className="filters flex gap-2 items-center">
        Rating
        <div
          className="px-5 py-2 border rounded-md bg-black hover:bg-slate-600 cursor-pointer"
          onClick={() => {
            setData((data) => [...data].sort((a, b) => a.rating - b.rating));
          }}
        >
          Low
        </div>
        <div
          className="px-5 py-2 border rounded-md bg-black hover:bg-slate-600 cursor-pointer"
          onClick={() => {
            setData((data) => [...data].sort((a, b) => b.rating - a.rating));
          }}
        >
          High
        </div>
      </div>
    </div>
  );
}
export default Filters;
