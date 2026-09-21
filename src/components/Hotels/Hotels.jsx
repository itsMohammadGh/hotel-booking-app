import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotel } from "../../context/HotelsProvider";

function Hotels() {
  const { isLoading, hotels } = useHotel();

  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>search resualt: ({hotels.length})</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div className="searchItem">
              <img src={item.thumbnail_url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €{item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
