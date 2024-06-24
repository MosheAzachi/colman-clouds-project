import React, { useState } from "react";
import apiClient from "../services/api-client";
import styles from "../styles/pages/CreateRecipe.module.scss";
import Button from "../components/Button/Button";

const CreateRecipe = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !image) {
      setMessage("Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await apiClient.post("/api/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error creating recipe.");
      console.error(error);
    }
  };

  return (
    <div className={styles.createRecipe}>
      <h1>Create a Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateRecipe;
