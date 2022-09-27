import React from "react";
import styles from "~/components/sectionCards/sectionCards.module.css";
import Card from "~/components/card";

type Video = {
  imgUrl: string;
};

interface Props {
  title: string;
  videos: Video[];
  size: "small" | "medium" | "large";
}

const SectionCards = (props: Props) => {
  const { title, videos, size } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => (
          <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} />
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
