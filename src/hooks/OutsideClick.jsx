import React, { useRef, useEffect } from 'react'

function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])
}

export default function OutsideClick({ children, onClickOutside }) {
  const wrapperRef = useRef(null)
  useOutsideClick(wrapperRef, onClickOutside)

  return <div ref={wrapperRef}>{children}</div>
}
