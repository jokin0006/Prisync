function Card({ title, price, rating, image, link, source }) {
  return (
    <a href={link} target="#" className="text-white hover:text-white">
      <div className="w-[400px] h-[150px] m-5 p-2 flex bg-slate-600 hover:text-slate-300 hover:bg-slate-700 rounded-lg">
        <div className="card-img w-[30%] max-h-full bg-slate-400 rounded-lg overflow-hidden">
          <img src={image} className="w-full h-full" alt="card-image" />
        </div>
        <div className="card-body flex flex-col p-3 w-[70%] h-full">
          <h2 className="card-title text-md bold overflow-hidden whitespace-nowrap text-ellipsis">
            {title}
          </h2>
          <p className="card-text text-2xl text-white place-items-center">
            Rs. {price}
          </p>
          <p className="card-text flex gap-10 justify-center items-center mt-4">
            <span className="rating">{`${rating} out of 5`}</span>
            <img
              src={`/${source}.png`}
              alt="source logo"
              className="w-20 object-fill"
            />
          </p>
        </div>
      </div>
    </a>
  );
}
export default Card;
