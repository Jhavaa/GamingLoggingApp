import React from "react";
import buildRequest from "../utils/buildRequest";
import Poster from "../components/Poster";
import NavBar from "../components/NavBar";
import Link from "next/link";

// import style from "../styles/Test.module.css";

function Test({ gameList }) {
  return (
    <div>
      <NavBar />
      <h1>Test Page</h1>
      <div className="posterContainer">
        <div className="poster">
          {gameList.map((game) => {
            return (
              <div
                key={game.id}
                className="card w-96 bg-base-100 shadow-xl m-2 zoom"
              >
                <figure>
                  <Link
                    href={{
                      pathname: "/games/[name]",
                      query: { name: game.slug },
                    }}
                  >
                    <a>
                      <Poster game={game} imageClass={"smImage"} />
                    </a>
                  </Link>
                </figure>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const fields = [
    "name",
    "slug",
    "cover.url",
    "platforms.abbreviation",
    "platforms.platform_logo.url",
    "total_rating",
    "release_dates.date",
    "aggregated_rating_count",
  ];
  const filter =
    "sort aggregated_rating_count desc; where aggregated_rating >= 90;";

  const query = "fields " + fields.join(",") + ";" + filter;

  const response = await buildRequest("igdb", "games", query);

  return {
    props: { gameList: response },
  };
}

export default Test;
