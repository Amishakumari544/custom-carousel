import React, { useMemo, useState, useEffect, useCallback } from 'react';

const slideWidth = 44;

const _items = [
  {
    dataitem: {
      title: 'Efren Reyes',
      image:
        'https://images.unsplash.com/photo-1591348122449-02525d70379b?ixlib=rb-1.2.1',
    },
  },
  {
    dataitem: {
      title: "Ronnie O'Sullivan",
      image:
        'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-1.2.1',
    },
  },
  {
    dataitem: {
      title: 'Shane Van Boening',
      image:
        'https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?ixlib=rb-1.2.1',
    },
  },
  {
    dataitem: {
      title: 'Mike Sigel',
      image:
        'https://images.unsplash.com/photo-1546190255-451a91afc548?ixlib=rb-1.2.1',
    },
  },
  {
    dataitem: {
      title: 'Willie Mosconi',
      image: 'https://i.postimg.cc/NfzMDVHP/willie-mosconi-slider.jpg',
    },
  },
];

_items.push(..._items);
// console.log(_items.length)

const createItem = (position, idx) => {
  // console.log(idx)
  const item = {
    styles: {
      transform: `translateX(${position * slideWidth}rem)`,
    },

    dataitem: _items[idx].dataitem,
  };
  console.log(item);

  return item;
};
const CarouselSlideItem = ({ pos, idx, activeIdx }) => {
  const item = createItem(pos, idx, activeIdx);

  return (
    <li className="carousel__slide-item" style={item.styles}>
      <div className="carousel__slide-item-img-link">
        <img
          src={item.dataitem.image}
          loading="lazy"
          alt={item.dataitem.title}
        />
      </div>
      <div className="carousel-slide-item__body">
        <h4>{item.dataitem.title}</h4>
        <p>{item.dataitem.desc}</p>
      </div>
    </li>
  );
};
// It creates a new array with a specified length, and then maps each index value to the corresponding index in the new array.
// const keys = Array.from(Array(_items.length).keys());
const keys = [];
for (let i = 0; i < _items.length; i++) {
  keys.push(i);
}

const Carousel = () => {
  const [items, setItems] = useState(keys);
  const [isTicking, setIsTicking] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const bigLength = useMemo(() => items.length * 2, [items.length]);

  const prevClick = useCallback(
    (jump = 1) => {
      if (!isTicking) {
        setIsTicking(true);
        setItems((prev) => prev.map((_, i) => prev[(i + jump) % bigLength]));
      }
    },
    [isTicking, bigLength]
  );

  const nextClick = useCallback(
    (jump = 1) => {
      if (!isTicking) {
        setIsTicking(true);
        setItems((prev) =>
          prev.map((_, i) => prev[(i - jump + bigLength) % bigLength])
        );
      }
    },
    [isTicking, bigLength]
  );

  const handleDotClick = useCallback(
    (idx) => {
      const diff = Math.abs(idx - activeIdx);
      if (diff > 0) {
        if (idx < activeIdx) prevClick(diff);
        else nextClick(diff);
      }
    },
    [activeIdx, prevClick, nextClick]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTicking) setIsTicking(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [isTicking]);

  useEffect(() => {
    setActiveIdx((length - (items[0] % length)) % length);
  }, [items]);

  return (
    <div className="carousel__wrap">
      <div className="carousel__inner">
        <button
          className="carousel__btn carousel__btn--prev"
          onClick={() => prevClick()}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--left" />
        </button>
        <div className="carousel__container">
          <ul className="carousel__slide-list">
            {items.map((pos, i) => (
              <CarouselSlideItem
                key={i}
                idx={i}
                pos={pos}
                activeIdx={activeIdx}
              />
            ))}
          </ul>
        </div>
        <button
          className="carousel__btn carousel__btn--next"
          onClick={() => nextClick()}
        >
          <i className="carousel__btn-arrow carousel__btn-arrow--right" />
        </button>
        <div className="carousel__dots">
          {items.slice(0, length).map((pos, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={i === activeIdx ? 'dot active' : 'dot'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
