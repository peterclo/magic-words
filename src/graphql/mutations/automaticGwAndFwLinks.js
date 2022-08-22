const mutation = `
mutation ($id: ID!, $input: GermanWordInput!) {
  updateGermanWord(
    id: $id,
    data: $input
  ) {
    data {
      id
      attributes {
        french_word {
          data {
            id
          }
        }
      }
    }
  }
}
`;

// CTRL ALT flèche du bas ou du haut ajoute un curseur (dédoublement) sur la ligne du bas ou du haut. Cela permet de taper un même caratère simultanément sur plusieurs lignes. Très utile pour ajouter les virgules de séparation des éléments d'un tableau lorqu'ils sont chacun sur une ligne différente.

const idGWs = [
  9, 10, 11, 12, 13, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22, 23, 24, 25, 25, 25, 25, 26, 27,
  28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 43, 44, 45, 45, 45, 46, 47, 47,
  48, 49, 49, 49, 49, 50, 50, 51,
];
const idFWs = [
  5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 16, 17, 18, 19, 19, 20, 20, 20, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 38, 39, 40, 40, 40, 41, 42, 42, 43,
  44, 44, 44, 44, 45, 45, 46,
];

for (let i = 0; i < idGWs.length; i++) {
  fetch("https://strapi.toccatech.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: mutation,
      variables: {
        id: idGWs[i],
        input: { french_word: idFWs[i] },
      },
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
    });
}
