import React from "react";
import Image from "next/image";

function Poster({ image, imageClass = "smImage" }) {
  return (
    <div className="posterItem">
      <div className={`image ${imageClass} is-3by4`}>
        <Image
          src={
            image.cover
              ? "https:" + image.cover.url.replace("t_thumb", "t_720p")
              : "https://bulma.io/images/placeholders/128x128.png"
          }
          layout="fill"
          objectFit="contain"
          // layout="intrinsic"
          // width={540}
          // height={720}
        />
      </div>
    </div>
  );
}

export default Poster;
