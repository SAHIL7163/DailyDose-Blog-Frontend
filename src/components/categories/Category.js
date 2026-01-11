import React from "react";
import { Link } from "react-router-dom";

import travelImg from "../../img/GettyImages-930881934-5ae56fe48023b90036464e72.jpg";
import techImg from "../../img/final-how-to-start-a-tech-blog-tips-and-tools-you-need-to-know-2.png";
import financeImg from "../../img/Finance-technology.jpg";
import fashionImg from "../../img/fashioncategory.png";
import foodImg from "../../img/foodcategory.png";
import sportsImg from "../../img/sportscategory.png";

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
  {
    name: "Fashion",
    path: "category/3",
    img: fashionImg,
  },
  {
    name: "Food",
    path: "category/4",
    img: foodImg,
  },
  // {
  //   name: "Personal",
  //   path: "category/5",
  //   img: techImg, // Using placeholder (reusing tech)
  // },
  {
    name: "Sports",
    path: "category/6",
    img: sportsImg,
  },
];

const Category = () => {
  const scrollContainerRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  // Handle window resize for responsive card sizing
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getScrollAmount = () => {
    // If mobile, scroll full container width. Desktop, use fixed card width + gap.
    if (scrollContainerRef.current) {
      return isMobile ? scrollContainerRef.current.clientWidth : (320 + 24);
    }

    return 344;
  }

  const updateScrollButtons = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Tolerance for float calculation
    setCanScrollLeft(scrollContainer.scrollLeft > 5);
    setCanScrollRight(
      scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 5
    );

    // Update active index
    const scrollAmount = isMobile ? scrollContainer.clientWidth : (320 + 24);
    if (scrollAmount > 0) {
      const index = Math.round(scrollContainer.scrollLeft / scrollAmount);
      setActiveIndex(index);
    }
  };

  const scrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.scrollBy({
      left: -getScrollAmount(),
      behavior: 'smooth'
    });
  };

  const scrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    scrollContainer.scrollBy({
      left: getScrollAmount(),
      behavior: 'smooth'
    });
  };

  React.useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    updateScrollButtons();
    scrollContainer.addEventListener('scroll', updateScrollButtons);

    return () => {
      scrollContainer.removeEventListener('scroll', updateScrollButtons);
    };
  }, [isMobile]); // Re-run sensitive logic on mobile change

  return (
    <div style={{ marginBottom: '3rem', position: 'relative' }}>
      {/* Left Arrow Button */}
      {true && (
        <button
          onClick={scrollLeft}
          className="category-nav-arrow"
          style={{
            position: 'absolute',
            left: isMobile ? '20px' : '-20px', // More inner padding for breakout
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--border-color)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      )}

      {/* Right Arrow Button */}
      {canScrollRight && (
        <button
          onClick={scrollRight}
          className="category-nav-arrow"
          style={{
            position: 'absolute',
            right: isMobile ? '20px' : '-20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--border-color)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      )}

      {/* Horizontal Scroll Container */}
      <div
        className="category-scroll-wrapper"
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: isMobile ? '0' : '1.5rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingBottom: '1rem',
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          // Mobile Breakout Logic
          width: isMobile ? '100vw' : 'auto',
          marginLeft: isMobile ? 'calc(-50vw + 50%)' : '0',
          marginRight: isMobile ? 'calc(-50vw + 50%)' : '0',
        }}
        id="category-scroll-container"
      >
        <style>
          {`
            #category-scroll-container::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {navlinks.map((link, index) => (
          <div
            key={index}
            className="category-card-wrapper"
            style={{
              width: isMobile ? '100vw' : '355px',
              minWidth: isMobile ? '100vw' : '355px',
              flexShrink: 0,
              scrollSnapAlign: 'center', // Snap to center for better feel
              padding: isMobile ? '0 1.5rem' : '0', // 1.5rem side padding for mobile card look
              boxSizing: 'border-box'
            }}
          >
            <Link
              to={link.path}
              state={{ categoryName: link.name, categoryImg: link.img }}
              className="text-decoration-none d-block h-100"
              draggable="false"
            >
              <div
                className="category-card card border-0 shadow-sm overflow-hidden h-100 position-relative"
                style={{
                  borderRadius: "1.5rem",
                  height: "350px",
                  overflow: "hidden",
                  position: "relative",
                  transform: "translateZ(0)",
                  isolation: "isolate"
                }}
              >
                {/* Background Image */}
                <div
                  className="category-bg"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${link.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.5s ease'
                  }}
                />

                {/* Gradient Overlay - Stronger at bottom for text readability */}
                <div className="category-overlay position-absolute w-100 h-100"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0) 100%)',
                    pointerEvents: 'none'
                  }}
                />

                <div
                  className="card-body position-relative p-4"
                  style={{
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end', /* Bottom alignment */
                    alignItems: 'center',      /* Horizontal center */
                    height: '100%',
                    textAlign: 'center',
                    paddingBottom: '2rem'
                  }}
                >
                  <h3 className="fw-bold" style={{
                    fontSize: '2rem',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '-0.5px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                    marginBottom: '1rem',
                    color: '#ffffff'
                  }}>
                    {link.name}
                  </h3>
                  <button style={{
                    fontSize: '0.8rem',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(4px)',
                    border: '2px solid rgba(255,255,255,0.8)',
                    color: 'white',
                    borderRadius: '50px',
                    padding: '0.25rem 1.5rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}>
                    Explore
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
        {navlinks.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === activeIndex ? '24px' : '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === activeIndex ? 'var(--accent-primary)' : 'var(--text-muted)',
              transition: 'all 0.3s ease',
              opacity: index === activeIndex ? 1 : 0.3
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
