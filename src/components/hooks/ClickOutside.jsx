import { useEffect } from 'react'

export const useClickOutside = (ref, listener) => {
  useEffect(() => {
    const handleClick = event => {
      if (!ref.current?.contains(event.target)) {
        return  listener(event);
      }
    }
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    }

  }, [ref, listener]);
}
