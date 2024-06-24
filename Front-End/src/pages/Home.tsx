import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import styles from "../styles/pages/Home.module.scss";

const Home = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await apiClient.get("/api/recipes");
        setRecipes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  return (
    <div className={styles.home}>
      <h1>Recipes</h1>

      <div className={styles.recipeList}>
        {recipes.map((recipe) => (
          <div key={recipe.ID} className={styles.recipe}>
            <h2>{recipe.Name}</h2>
            <p>{recipe.Description}</p>
            <img
              src={recipe.imageUrl}
              alt={recipe.Name}
              // onError={(e) => (e.currentTarget.src = "/images/fallback-image.jpg")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
