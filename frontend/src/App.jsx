import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Movies from "./components/Movies";
import MoviePage from "./components/MoviePage";
import React from "react";

function App() {

  const [triggerMoviesFetch, setTriggerMoviesFetch] = React.useState(true);
  const [triggerReviewsFetch, setTriggerReviewsFetch] = React.useState(true);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout triggerMoviesFetch={triggerMoviesFetch}
                                          triggerReviewsFetch={triggerReviewsFetch}
                                          setTriggerMoviesFetch={setTriggerMoviesFetch}
                                          setTriggerReviewsFetch={setTriggerReviewsFetch} />}>
          <Route index element={<Movies triggerMoviesFetch={triggerMoviesFetch} />} />
          <Route path="/movie/:id" element={<MoviePage triggerReviewsFetch={triggerReviewsFetch} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
