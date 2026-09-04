import express from 'express';
import { Liquid } from 'liquidjs';

const app = express();
const engine = new Liquid();

const apiUrl = "https://fdnd.directus.app/items/person?*.*.*&filter[squads][squad_id][cohort][_eq]=2627&fields=name,fav_season,bio,profilecard,fav_animal";
// persons https://fdnd.directus.app/items/person?fields=&filter[squads][squad_id][cohort][_eq]=2627
// name and id https://fdnd.directus.app/items/person?fields=name,id&filter[squads][squad_id][cohort][_eq]=2627
// 5 fields https://fdnd.directus.app/items/person?*.*.*&filter[squads][squad_id][cohort][_eq]=2627&fields=name,fav_season,bio,profilecard,fav_animal
app.use(express.urlencoded({ extended: true }));

app.engine('liquid', engine.express());
app.set('views', './views');
app.set('view engine', 'liquid');

app.get('/', async (req, res) => {
  const personResponse = await fetch(apiUrl);
  const personResponseJSON = await personResponse.json();
  
  res.render('index.liquid', {
    persons: personResponseJSON.data
  });
  console.log(personResponseJSON);
});

// const details = "https://fdnd.directus.app/items/person?*.*.*&filter[squads][squad_id][cohort][_eq]=2627&fields=name,fav_season,bio,profilecard,fav_animal";
// app.get('/', async (req, res) => {
//   const personResponse = await fetch(details);
//   const personResponseJSON = await personResponse.json();

//   res.render('detail.liquid', {
//     persons: personResponseJSON.data
//   });
//   console.log(personResponse);
// });

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
