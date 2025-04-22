import React from "react";
import styles from "./Text.module.scss";

type Props = {
  text: string;
};

const Text: React.FC<Props> = ({ text }) => {
  return <div className={styles.container}>{text}</div>;
};

export default Text;
