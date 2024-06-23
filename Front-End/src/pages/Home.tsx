import { useState } from "react";
import styles from "../styles/pages/Home.module.scss";
import Button from "../components/Button/Button";
import apiClient from "../services/api-client";

function Home() {
  const [text, setText] = useState<string>("Will Change");
  const handleBackEndClick = async () => {
    const response = await apiClient.get("/api/code");
    setText(response.data.code);
  };
  const handleRDSClick = async () => {
    const response = await apiClient.get("/api/rds");
    setText(response.data.result[0].Word);
  };
  return (
    <div className="home">
      <div className={styles.homeBox}>
        <h1>Home Page</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fermentum, neque eu maximus sagittis, libero efficitur elit, a eleifend mi purus quis nisi. Nullam ac luctus metus. Sed at est vel libero iaculis pharetra. Donec
          lacinia ullamcorper felis, id condimentum velit maximus eu. Duis efficitur tortor eget malesuada mollis. Etiam condimentum enim at ex mattis, sit amet aliquam justo maximus. Fusce euismod tellus id justo ultrices auctor. Nullam
          vitae rutrum risus.
        </p>
        <div className={styles.buttonBox}>
          <Button variant="contained" onClick={handleBackEndClick}>
            Get Back-End Word
          </Button>
        </div>
        <div className={styles.buttonBox}>
          <Button variant="contained" onClick={handleRDSClick}>
            Get RDS Word
          </Button>
        </div>
        <h1>{text}</h1>
      </div>
    </div>
  );
}

export default Home;
