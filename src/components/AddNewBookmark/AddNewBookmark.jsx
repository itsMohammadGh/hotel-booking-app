import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../Hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return;
    setIsLoadingGeoCoding(true);
    setGeoCodingError(null);
    async function fetchLoactionData() {
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`,
        );

        if (!data.countryCode)
          throw new Error("This Location is not a city , pick somewhere else ");

        setCityName(data.city || data.locality || "");
        setCountryName(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeoCodingError(error.message);
        console.log(error);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLoactionData();
  }, [lat, lng]);

  if (isLoadingGeoCoding) return <Loader />;
  if (geoCodingError) return <p>{geoCodingError}</p>;
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input type="text" name="cityName" id="cityName" value={cityName} />
        </div>

        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input type="text" name="country" id="country" value={countryName} />
          <ReactCountryFlag svg countryCode={countryCode}  className="flag"/>
        </div>

        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; Back
          </button>
          <button className="btn btn--primary">Add New Bookmark</button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
