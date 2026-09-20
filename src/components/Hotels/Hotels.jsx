import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../Hooks/UseFetch";
import Loader from "../Loader/Loader";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const rooms = JSON.parse(searchParams.get("options"))?.room;
  const [data, isLoading] = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${rooms || 1}`,
  );
  if (isLoading) return <Loader />;
  return (
    <div className="searchList">
      <h2>search resualt: ({data.length})</h2>
      {data.map((item) => {
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
