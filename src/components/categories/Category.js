import React from "react";
import { Link } from "react-router-dom";

import travelImg from "../../img/GettyImages-930881934-5ae56fe48023b90036464e72.jpg";
import techImg from "../../img/final-how-to-start-a-tech-blog-tips-and-tools-you-need-to-know-2.png";
import financeImg from "../../img/Finance-technology.jpg";

const navlinks = [
  {
    name: "Travel",
    path: "category/0",
    img: travelImg,
  },
  {
    name: "Tech",
    path: "category/1",
    img: techImg,
  },
  {
    name: "Finance",
    path: "category/2",
    img: financeImg,
  },
];

const Category = () => {
  return (
    <div className="category-container">
      {navlinks.map((link, index) => (
        <div
          className="category"
          style={{
            backgroundImage: `url(${link.img})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="category-content">
            <Link
              key={index}
              to={link.path}
              state={{ categoryName: link.name }}
            >
              <button>{link.name}</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Category;
