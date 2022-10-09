import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../../../assets/placeholder.jpg";
import Loading from "../../../components/Loading/Loading";

/**
 * Popular Movie Api : https://movie-task.vercel.app/api/popular?page=1
 *
 * Particular Movie Api : https://movie-task.vercel.app/api/movie?movieId=634649
 *
 * Search Movie Api : https://movie-task.vercel.app/api/search?page=1&query=Avengers
 *
 * Image Link Before Path : https://image.tmdb.org/t/p/original
 *
 *  */

const Movies = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [url, setUrl] = useState(
    "https://movie-task.vercel.app/api/popular?page=1"
  );

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      if (query) {
        setUrl(
          `https://movie-task.vercel.app/api/search?page=${currentPage}&query=${query}`
        );
      } else {
        setUrl(`https://movie-task.vercel.app/api/popular?page=${currentPage}`);
      }
      try {
        const { data } = await axios.get(url);
        setMovies(data?.data?.results);
        setTotalPage(data?.data?.total_pages);
      } catch (error) {
        Swal.fire("Oops", "Something went wrong...!", "error");
      }
      setLoading(false);
    };
    getData();
  }, [currentPage, url, setUrl, query]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white py-8 px-2 md:px-16">
      <h1 className="text-2xl font-semibold text-neutral mb-4">
        {query ? "Search Result for: " + query : "What's Popular Right Now"}
      </h1>

      {movies.length === 0 ? (
        <h1 className="text-center my-8 text-3xl text-primary font-medium">
          No Movie Found
        </h1>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-7 gap-x-3 gap-y-6">
            {movies.map((movie) => {
              const { id, title, poster_path, release_date, vote_average } =
                movie;
              return (
                <div
                  key={id}
                  className="rounded-lg mx-auto shadow-md hover:shadow-primary duration-300"
                >
                  <Link to={`/movie/${id}`} className="flex flex-col">
                    <div className="relative w-full min-h-[350px]">
                      <LazyLoadImage
                        alt={placeholder}
                        placeholderSrc={placeholder}
                        effect="opacity"
                        src={
                          "https://image.tmdb.org/t/p/original" + poster_path
                        }
                        width="100%"
                        height="100%"
                        className="block min-h-[350px] min-w-full rounded-t-lg"
                      />
                      <span className="absolute -bottom-3 left-2 w-10 h-10 rounded-full bg-neutral  flex items-center justify-center">
                        <span
                          className={`rounded-full w-9 h-9 bg-neutral text-white font-semibold flex items-center justify-center border-2 p-2 ${
                            vote_average > 5 ? "border-success" : "border-error"
                          }`}
                        >
                          {vote_average}
                        </span>
                      </span>
                    </div>
                    <div className="mt-4 p-2 flex flex-col justify-between">
                      <h3 className="block text-black font-semibold text-xl hover:text-primary">
                        {title}
                      </h3>
                      <span className="text-neutral text-sm">
                        {release_date}
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
            <div className="w-full  flex items-center justify-between border-t border-gray-200">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                className="flex items-center pt-3 text-gray-600 hover:text-primary cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={currentPage < 2}
              >
                <HiOutlineArrowNarrowLeft />
                <p className="text-sm ml-3 font-medium leading-none ">
                  Previous
                </p>
              </button>
              <div className="sm:flex hidden">
                {[...Array(totalPage >= 10 ? 10 : totalPage).keys()].map(
                  (page) => (
                    <button
                      key={page + 1}
                      onClick={() => setCurrentPage(page + 1)}
                      className={`text-sm font-medium leading-none cursor-pointer  hover:text-primary border-t  hover:border-primary pt-3 mr-4 px-2 duration-300 ${
                        page + 1 === currentPage
                          ? "text-primary border-primary"
                          : "text-gray-600 border-transparent"
                      }`}
                    >
                      {page + 1}
                    </button>
                  )
                )}
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                className="flex items-center pt-3 text-gray-600 hover:text-primary cursor-pointer disabled:cursor-not-allowed disabled:text-gray-300"
                disabled={currentPage >= totalPage}
              >
                <p className="text-sm font-medium leading-none mr-3">Next</p>
                <HiOutlineArrowNarrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
