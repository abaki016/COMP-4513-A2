import { useEffect, useRef } from 'react';

const AboutModal = (props) => {
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props]);

  const modalRef = useRef(null);

  if (!props.open) return null; // if the modal is not open, don't render anything

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="p-6 bg-white rounded-md shadow-md w-80"
      >
        <span className="absolute cursor-pointer top-2 right-2" onClick={props.close}>
          ❌
        </span>
        <h1 className="mb-4 text-xl font-bold">About This Project</h1>
        <div className="mb-4">
          <a href="https://github.com/fawzisilver" target="_blank" className="block hover:text-blue-500">Isaac Abelida</a>
          <a href="https://github.com/abaki016" target="_blank" className="block hover:text-blue-500">Arthur Bakir</a>
          <a href="https://github.com/abaki016/COMP-4513-A2" target="_blank" className="block hover:text-blue-500">Repository</a>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;