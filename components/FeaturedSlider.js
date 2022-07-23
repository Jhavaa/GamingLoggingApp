import React from "react";
import Link from "next/link";
import Poster from "./Poster";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

// import required modules
import { Pagination } from "swiper";

function FeaturedSlider({ gameProp, sliderTitle = "" }) {
  console.log("---------Game Prop------");
  console.log(gameProp[1].summary);

  return (
    <div>
      <Swiper
        loop={true}
        pagination={{
          dynamicBullets: true,
        }}
        style={{
          "--swiper-pagination-color": "rgb(29, 78, 216)",
          "--swiper-pagination-bullet-inactive-color": "rgb(255, 255, 255)",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          //   "--swiper-pagination-bullet-size": "16px",
          //   "--swiper-pagination-bullet-horizontal-gap": "6px",
        }}
        modules={[Pagination]}
        className="featuredSwiper"
      >
        {gameProp.map((game) => (
          <SwiperSlide
            className="bg-cover bg-center-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(7, 18, 36, 0.4), rgb(7, 18, 36)), url(https:" +
                game.screenshots[0].url.replace("t_thumb", "t_screenshot_big") +
                ")",
            }}
          >
            <div className="hope">
              <div className="card card-side backdrop-blur-xl backdrop-brightness-150">
                <Link
                  href={{
                    pathname: "/games/[name]",
                    query: { name: game.slug },
                  }}
                >
                  <a>
                    <Poster key={game.id} image={game} />
                  </a>
                </Link>
                <div className="card-body">
                  <h1 className="card-title text-white text-6xl">
                    {game.name}
                  </h1>
                  <h2 className="card-title text-white text-2xl">
                    Rating: {game.rating.toFixed(0)}
                  </h2>
                  <div className="divider"></div>
                  <p className="text-white">
                    {game.summary
                      .substring(0, 200)
                      .substring(
                        0,
                        game.summary.substring(0, 200).lastIndexOf(" ")
                      ) + "..."}
                    {/* Click the button to watch on Jetflix app. */}
                    {/* aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FeaturedSlider;
