import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useBookmark } from "../../context/BookmarkList";

function BookmarkLayout() {
  const { bookmarks } = useBookmark();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerlocation={bookmarks} />
    </div>
  );
}

export default BookmarkLayout;
