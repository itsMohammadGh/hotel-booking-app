import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkList";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, isLoadingCurrentBookmark, currentBookmark } =
    useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  const navigate = useNavigate();

  if (isLoadingCurrentBookmark || !currentBookmark) return <Loader />;
  return (
    <div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="btn btn--back"
      >
        &larr; back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <p className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp;<strong>{currentBookmark.cityName}</strong>
        &nbsp; <span>{currentBookmark.country}</span>
      </p>
    </div>
  );
}

export default SingleBookmark;
