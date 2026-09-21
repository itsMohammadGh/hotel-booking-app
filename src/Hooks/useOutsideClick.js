import { useEffect } from "react";

export default function useOutsideClick(ref, exeptionId, cb) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target) && event.target.id !== exeptionId) {
        console.log("outSide click");
        cb();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
  }, [ref, cb]);
  
}


