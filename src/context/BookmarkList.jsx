import { createContext, useContext, useState } from "react";
import useFetch from "../Hooks/UseFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkProvider({ children }) {
  const [currentBookmark, setCurrentBookmark] = useState({});
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoadingCurrentBookmark(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoadingCurrentBookmark(false);
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        isLoadingCurrentBookmark,
        currentBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
