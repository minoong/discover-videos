import Image from "next/image";
import React, { useState } from "react";
import styles from "~/components/card/card.module.css";
import { motion } from "framer-motion";
import cls from "classnames";

interface Props {
  id?: number;
  size?: "small" | "medium" | "large";
  imgUrl?: string;
}

const defaultImgUrl =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80";

const Card = (props: Props) => {
  const { id, size = "medium", imgUrl = defaultImgUrl } = props;
  const [imgSrc, setImgSrc] = useState<string>(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const handleOnError = () => {
    setImgSrc(defaultImgUrl);
  };

  return (
    <div className={styles.container}>
      <div className={classMap[size]}>
        <motion.div
          className={cls(styles.imgMotionWrapper, classMap[size])}
          whileHover={{ ...scale }}
        >
          <Image
            src={imgSrc}
            alt="image"
            layout="fill"
            onError={handleOnError}
            className={styles.cardImg}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Card;
