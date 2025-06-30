import React from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  function goToNextPage() {
    if (currentPage === pages[pages.length - 1]) return;
    setCurrentPage((page) => page + 1);
  }
  function goToPreviousPage() {
    if (currentPage === 1) return;
    setCurrentPage((page) => page - 1);
  }

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="dark:bg-black flex justify-center">
      <div className="flex rounded-md mt-8">
        <a
          href="#"
          className="py-2 px-4 leading-tight dark:bg-[#0d0d0d] dark:hover:bg-black dark:text-white hover:bg-white  dark:border-gray-800 border border-gray-400 text-black border-r-0 ml-0 rounded-l"
          onClick={() => goToPreviousPage()}
        >
          <span>Previous</span>
        </a>
        {pages.map((page, index) => {
          return (
            <a
              href="#"
              className="py-2 px-4 leading-tight dark:bg-[#0d0d0d] dark:hover:bg-black  dark:text-white border border-gray-400 dark:border-gray-800 text-black border-r-0 hover:bg-white"
              key={index}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </a>
          );
        })}
        <a
          href="#"
          className="py-2 px-4 leading-tight dark:bg-[#0d0d0d] dark:hover:bg-black hover:bg-white dark:text-white border dark:border-gray-800 border-gray-400 text-black rounded-r"
          onClick={() => goToNextPage()}
        >
          <span>Next</span>
        </a>
      </div>
    </div>
  );
};

export default Pagination;
