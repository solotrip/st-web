import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = (props) => {
  return (
    <>
      <section className="skeletonback">
        <section className="skeletonitem">
          <ul className="list">
            {Array(props.items)
              .fill()
              .map((item, index) => (
                <li className="card" key={index}>
                  <h2 className="section-title">
                    <Skeleton
                      duration={1}
                      height={index % 3 == 0 ? 30 : 0}
                      width={150}
                    />
                  </h2>

                  <Skeleton
                    height={120}
                    width={180}
                    duration={1.5}
                    style={{ borderRadius: 16 }}
                  />
                </li>
              ))}
          </ul>
        </section>
      </section>
    </>
  );
};

export default SkeletonCard;
