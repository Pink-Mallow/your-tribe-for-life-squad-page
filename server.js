export async function load(){
  const res = await fetch(`https://fdnd.directus.app/items/squad`);
  const data = await res.json;
  console.log(data);

  return {
    persons: data.data
  }
}