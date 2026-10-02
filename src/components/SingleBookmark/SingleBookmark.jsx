import { useParams } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkList";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, isLoadingCurrentBookmark, currentBookmark } =
    useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoadingCurrentBookmark || !currentBookmark) return <Loader />;
  return (
    <div>
      <h2>{currentBookmark.cityName}</h2>
    </div>
  );
}

export default SingleBookmark;
