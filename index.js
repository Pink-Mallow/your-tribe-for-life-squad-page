import express from 'express';
import { Liquid } from 'liquidjs';

const app = express();
const engine = new Liquid();

const apiUrl = "https://fdnd.directus.app/items/person?*.*.*&filter[squads][squad_id][cohort][_eq]=2627&fields=name,fav_season,bio,profilecard,fav_animal";
// persons https://fdnd.directus.app/items/person?fields=&filter[squads][squad_id][cohort][_eq]=2627
// name and id https://fdnd.directus.app/items/person?fields=name,id&filter[squads][squad_id][cohort][_eq]=2627
// 5 fields https://fdnd.directus.app/items/person?*.*.*&filter[squads][squad_id][cohort][_eq]=2627&fields=name,fav_season,bio,profilecard,fav_animal

app.use(express.urlencoded({ extended: true }));

// The app.use(express.static('assets')) code is used to serve static files such as 
// images, CSS files, and JavaScript files in an Express app. 
// The express.static middleware function is used to expose a directory or a file to a 
// particular URL so its contents can be publicly accessed. 
app.use(express.static('public'));

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

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
