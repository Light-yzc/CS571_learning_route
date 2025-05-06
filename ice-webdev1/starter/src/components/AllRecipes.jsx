import { useEffect, useState } from "react";
import Recipe from "./Recipe";

// Typically we wouldn't declare variables outside of our React component,
// but because they are truly constant values it is okay!

// Taken from https://cs571api.cs.wisc.edu/rest/s25/ice/pizza
const RECIPE_PIZZA = JSON.parse(`{"name":"Classic Margherita Pizza","author":"OpenAI","img":{"location":"https://raw.githubusercontent.com/CS571-S25/ice-api-static-content/main/pizza.png","description":"A mouth-watering Margherita Pizza!"},"keywords":["Italian","traditional","simple","delicious"],"reviews":[{"txt":"An authentic taste of Italy - the perfect balance of flavors!","rating":5},{"txt":"Simple ingredients, but incredibly delicious. A true classic done right.","rating":5},{"txt":"The fresh basil and mozzarella make all the difference. Absolutely loved it!","rating":4},{"txt":"Easy to make and tastes better than restaurant pizza!","rating":5}],"ingredients":{"pizza dough":{"amount":1,"unit":"lb"},"mozzarella cheese":{"amount":8,"unit":"oz","misc":"freshly sliced"},"tomato sauce":{"amount":1,"unit":"cup"},"fresh basil leaves":{"amount":10},"extra virgin olive oil":{"amount":2,"unit":"tablespoon"},"salt":{"amount":0.5,"unit":"teaspoon"},"ground black pepper":{"amount":0.25,"unit":"teaspoon"}},"recipe":["Prepare the Base: Preheat your oven to 475°F (245°C). On a floured surface, roll out the pizza dough to your desired thickness and place it on a pizza stone or a baking sheet.","Add Toppings: Spread the tomato sauce evenly over the dough. Arrange the mozzarella slices on top and sprinkle with salt and black pepper.","Bake: Drizzle the pizza with olive oil and bake in the preheated oven for about 10-15 minutes, or until the crust is golden and the cheese is bubbly.","Finish with Basil: Once out of the oven, immediately top with fresh basil leaves.","Serve: Allow the pizza to cool for a few minutes before slicing and serving."]}`);

// Taken from https://cs571api.cs.wisc.edu/rest/s25/ice/pasta
const RECIPE_PASTA = JSON.parse(`{"name":"Classic Spaghetti Carbonara","author":"OpenAI","img":{"location":"https://raw.githubusercontent.com/CS571-S25/ice-api-static-content/main/pasta.png","description":"A plate of creamy spaghetti carbonara"},"keywords":["creamy","rich","traditional","comforting"],"reviews":[{"txt":"Authentic taste with perfect creamy texture, feels like Italy on a plate!","rating":5},{"txt":"Love the balance of flavors, especially the crispy bacon bits.","rating":4},{"txt":"A family favorite! So easy to make and yet so delicious and comforting.","rating":5},{"txt":"Simple ingredients, yet the result is so luxurious and satisfying.","rating":5}],"ingredients":{"spaghetti":{"amount":12,"unit":"oz"},"large eggs":{"amount":4,"misc":"preferably free-range or organic"},"grated Parmesan cheese":{"amount":1,"unit":"cup"},"guanciale or pancetta":{"amount":8,"unit":"oz","misc":"diced"},"garlic":{"amount":2,"misc":"cloves, minced"},"salt":{"amount":1,"unit":"teaspoon"},"freshly ground black pepper":{"amount":1,"unit":"teaspoon"}},"recipe":["Cook Pasta: In a large pot of boiling salted water, cook spaghetti until al dente. Reserve 1 cup of pasta water and then drain.","Prepare Sauce: While the pasta is cooking, whisk together the eggs, Parmesan, and black pepper in a bowl.","Cook Guanciale: In a large skillet, cook the guanciale or pancetta over medium heat until crispy. Add minced garlic and cook for about 1 minute.","Combine: Remove skillet from heat. Add the drained spaghetti and toss well. Quickly whisk in the egg mixture, adding pasta water as needed to make it creamy.","Serve: Serve immediately, garnished with additional grated Parmesan and black pepper."]}`);

// Taken from https://cs571api.cs.wisc.edu/rest/s25/ice/chili
const RECIPE_CHILI = JSON.parse(`{"name":"7-Ingredient Chili","author":"OpenAI","img":{"location":"https://raw.githubusercontent.com/CS571-S25/ice-api-static-content/main/chili.png","description":"A delicious bowl of chili!"},"keywords":["hearty","flavorful","simple","comforting"],"reviews":[{"txt":"A burst of warmth and flavor in every spoonful; simple yet irresistible!","rating":5},{"txt":"The perfect blend of spice and comfort, an easy go-to chili recipe.","rating":4},{"txt":"Loved the hearty texture and rich taste - a new family favorite!","rating":5},{"txt":"Quick, flavorful, and satisfying - this chili hits all the right notes!","rating":5}],"ingredients":{"ground beef":{"amount":1,"unit":"lb"},"kidney beans":{"amount":15,"unit":"oz","misc":"drained and rinsed"},"diced tomatoes":{"amount":14.5,"unit":"oz","misc":"with juice"},"chili powder":{"amount":2,"unit":"tablespoon"},"onion":{"amount":1,"misc":"diced"},"bell pepper":{"amount":1,"misc":"diced"},"ground cumin":{"amount":1,"unit":"teaspoon"}},"recipe":["Cook Meat with Vegetables: In a large pot, cook the ground beef, diced onion, and diced bell pepper over medium heat until the meat is no longer pink and the vegetables are softened.","Add Remaining Ingredients: To the pot, add the kidney beans, diced tomatoes (with their juice), chili powder, ground cumin, and salt to taste. If the chili is too thick, add a little water to reach your desired consistency.","Simmer: Bring the mixture to a boil, then reduce the heat and simmer for about 20-30 minutes to allow the flavors to meld. Stir occasionally.","Serve: Enjoy your chili as is, or with toppings like shredded cheese or sour cream."]}`);

export default function AllRecipes(props) {
    const [pizza, setpizza] = useState();
    const [pasta, setpa] = useState();
    const [chilt, setch] = useState();
    useEffect( () => {
        fetch('https://cs571.org/rest/s25/ice/pizza', {
            headers:{
                "X-CS571-ID": CS571.getBadgerId(),
            }
        })
        .then( (data) => data.json())
        .then((data) => {
            // console.log(data);
            setpizza(data);
            console.log('done1')

        })

        fetch('https://cs571.org/rest/s25/ice/chili', {
            headers:{
                "X-CS571-ID": CS571.getBadgerId(),
            }
        })
        .then( (data) => data.json())
        .then((data) => {
            console.log(data);
            setch(data);
            console.log('done2')
        })
        
        fetch('https://cs571.org/rest/s25/ice/pasta', {
            headers:{
                "X-CS571-ID": CS571.getBadgerId(),
            }
        })
        .then( (data) => data.json())
        .then((data) => {
            console.log('done3');
            setpa(data);

        })



    }, [])
    return <div>
        <h1>Welcome to Badger Recipes!</h1>
        <br></br>
        {pizza ? <Recipe {...pizza}/> :<p>Still Loading</p>};
        <br></br>
        {pizza ? <Recipe {...pizza}/> :<p>Still Loading</p>};
        <br></br>
        {pizza ? <Recipe {...pizza}/> :<p>Still Loading</p>};
    </div>
}