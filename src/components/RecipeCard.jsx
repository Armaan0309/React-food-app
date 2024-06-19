import { Heart, HeartPulse, Soup } from 'lucide-react';
import React, { useState } from 'react'


const getTwoValuesFromArray = (arr) => {
  return [arr[0], arr[1]];
}
const RecipeCard = ({ recipe,bg,badge }) => {
  const healthLabels = getTwoValuesFromArray(recipe.healthLabels);
  const [isFavorite, setisFavorite] = useState(localStorage.getItem("favorites")?.includes(recipe.label));


  const addRecipeToFavorites = ()=>{
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isRecipeAlreadyInFavorites = favorites.some((fav) => fav.label === recipe.label);

  if(isRecipeAlreadyInFavorites){
    favorites = favorites.filter((fav) => fav.label !== recipe.label);
    setisFavorite(false);
  }else{
    favorites.push(recipe);
    setisFavorite(true);
  }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <div className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}>
      <a 
      href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`} target='_blank'
      
      className='relative h-36'>

        <img src={recipe.image} alt="recipe image" className='rounded-md w-full h-full object-cover' />

        <div className='absolute bottom-2 left-2 bg-white rounded-full p-2 cursor-pointer flex items-center gap-1 text-sm font-semibold '>
          <Soup size={"16"} /> {recipe.yield} Servings
        </div>

        <div className='absolute top-2 right-2 p-1 bg-white rounded-full cursor-pointer '
          onClick={(e)=> {
            e.preventDefault();
            addRecipeToFavorites();
          }}
        >
          
          {!isFavorite && <Heart size={"20"} className='hover:fill-red-500 hover:text-red-500' />}
          {isFavorite && <Heart size={"20"} className='fill-red-500 text-red-500' />}

        </div>

      </a>

      <div className='flex mt-1'>
        <p className='font-bold tracking-wide'>{recipe.label}</p>
      </div>
      <p className='my-2'>
        {
          recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)
        } Kitchen</p>

      <div className='flex gap-2 mt-auto'>
        {
          healthLabels.map((label, idx) => (
            <div key={idx} className={`flex gap-1 ${badge} items-center p-2 rounded-md`}>
              <HeartPulse size={"16"} />
              <span className='text-sm tracking-tight font-semibold'>{label}</span>
            </div>
          
          ))
        }
      </div>

    </div>
  )
}

export default RecipeCard;
