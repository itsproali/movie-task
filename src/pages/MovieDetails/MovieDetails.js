import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { AiOutlineUser, AiOutlineWarning } from "react-icons/ai";
import { MdHowToVote } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholder from "../../assets/placeholder.jpg";
import axios from "axios";
import Swal from "sweetalert2";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://movie-task.vercel.app/api/movie?movieId=${id}`
        );
        setMovie(data?.data);
      } catch (error) {
        Swal.fire("Oops", "Something went wrong...!", "error");
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  // Destructure Properties
  const {
    adult,
    backdrop_path,
    budget,
    genres,
    homepage,
    imdb_id,
    overview,
    popularity,
    poster_path,
    release_date,
    revenue,
    runtime,
    spoken_languages,
    status,
    tagline,
    title,
    vote_average,
    vote_count,
    production_companies,
  } = movie;

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="min-h-screen bg-neutral bg-opacity-90 relative p-4 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <LazyLoadImage
          placeholderSrc={placeholder}
          alt={placeholder}
          effect="black-and-white"
          src={"https://image.tmdb.org/t/p/original" + backdrop_path}
          className={`${
            backdrop_path ? "hidden md:block" : "hidden"
          } absolute top-0 right-0 bottom-0 left-0 m-auto -z-10 max-h-screen w-full`}
        />
        <div className="w-[80%] md:w-[30%] min-h-[60%]">
          <LazyLoadImage
            placeholderSrc={placeholder}
            alt={placeholder}
            effect="black-and-white"
            src={"https://image.tmdb.org/t/p/original" + poster_path}
            width="100%"
            height="100%"
            className="block rounded-lg shadow"
          />
        </div>

        <div className="flex flex-col items-start w-[100%] md:w-[70%]">
          <h1 className="text-3xl font-semibold text-white hover:text-gray-200">
            <a href={homepage} target="_blank" rel="noopener noreferrer">
              <span>{title}</span>
              <span className="font-normal">
                {"(" + release_date?.split("-")[0] + ")"}
              </span>
            </a>
          </h1>
          <div className="flex items-center">
            {genres?.map((genre) => (
              <span key={genre.id}>{genre.name + ", "}</span>
            ))}
          </div>

          <div className="flex items-center gap-6 mb-4">
            <div
              className="w-16 h-16 rounded-full bg-neutral flex items-center justify-center"
              title="Rating"
            >
              <span
                className={`rounded-full w-14 h-14 bg-neutral text-white font-semibold flex items-center justify-center border-2 p-2 ${
                  vote_average > 5 ? "border-success" : "border-error"
                }`}
              >
                {vote_average?.toFixed(2) || undefined}
              </span>
            </div>

            <div
              className="flex items-center gap-1 text-white"
              title="Vote Count"
            >
              <span>
                <MdHowToVote className="text-4xl" />
              </span>
              <span>{vote_count || "undefined"}</span>
            </div>
            <div
              className="flex items-center gap-1 text-white"
              title="Popularity"
            >
              <span>
                <AiOutlineUser className="text-4xl" />
              </span>
              <span>{popularity || "undefined"} m</span>
            </div>
            {adult && (
              <div className="flex items-center gap-1 text-white" title="Adult">
                <span>
                  <AiOutlineWarning className="text-4xl" />
                </span>
                <span>Adult Movie</span>
              </div>
            )}
          </div>

          <div className="text white my-6">
            <h3 className="font-semibold">Overview</h3>
            <p>{overview || "undefined"}</p>
          </div>

          <div className="flex items-center gap-6">
            <span>
              Status: <b>{status || "undefined"}</b>
            </span>
            {release_date && (
              <span>
                ReleaseDate: <b>{release_date}</b>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-16 bg-white">
        <h2 className="text-neutral font-semibold text-3xl border-l-4 border-primary pl-2 ">
          Additional Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 text-xl text-black py-6">
          {budget && <span>
            Budget: <b>{budget}</b>
          </span>}
          {revenue && <span>
            Revenue: <b>{revenue}</b>
          </span>}
          {spoken_languages && <span>
            Languages:{" "}
            {spoken_languages?.map((language) => (
              <b key={language.english_name}>{language.english_name + ", "}</b>
            ))}
          </span>}
          {imdb_id && <span>
            IMDB:{" "}
            <a
              href={"https://www.imdb.com/title/" + imdb_id}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {title}
            </a>
          </span>}
          {runtime && <span>
            Runtime: <b>{runtime}</b>
          </span>}
          {tagline && <span>
            TagLine: <b>{tagline}</b>
          </span>}
        </div>

        <h3 className="text-black font-semibold text-2xl pl-4 my-10">
          Production:
        </h3>

        <div className="flex items-center gap-16 flex-wrap">
          {production_companies?.map((company) => (
            <button
              key={company.id}
              className="flex items-center justify-center flex-col"
              title={company.name + ", " + company.origin_country}
            >
              <div className="w-20 h-16">
                <LazyLoadImage
                  alt={placeholder}
                  placeholderSrc={placeholder}
                  effect="black-and-white"
                  src={
                    "https://image.tmdb.org/t/p/original" + company?.logo_path
                  }
                  // width="100%"
                  height="100%"
                  className="block max-w-full"
                />
              </div>
              <h3 className="text-black text-xl font-medium">
                {company?.name}
              </h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
