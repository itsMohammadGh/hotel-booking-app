import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../Hooks/UseFetch";

const HotelContext = createContext();

function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const rooms = JSON.parse(searchParams.get("options"))?.room;
  const { data: hotels, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${rooms || 1}`,
  );

  return (
    <HotelContext.Provider value={{ isLoading, hotels }}>
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export function useHotel() {
  return useContext(HotelContext);
}
