import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const MovieDetails = () => {
  const { id } = useParams();

  //   const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     const getData = async () => {
  // setLoading(true)
  //       try {
  //         const { data } = await axios.get(
  //           `https://movie-task.vercel.app/api/movie?movieId=${id}`
  //         );
  //         setMovie(data?.data?.results);
  //       } catch (error) {
  //         Swal.fire("Oops", "Something went wrong...!", "error")
  //       }
  // setLoading(false)
  //     };
  //     getData();
  //   }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen">
      <h1 className="text-4xl">Getting Data of {id}</h1>
    </div>
  );
};

export default MovieDetails;
