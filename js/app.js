// Remplacez par l’URL de votre webhook Make
const ENDPOINT = 'https://hook.eu2.make.com/swqey9y3lq48p2y9jinbkf728cxa617t';

fetch(ENDPOINT)
  .then(r => r.ok ? r.json() : Promise.reject(r))
  .then(records => drawTable(records))   // ≈ 10 lignes déjà
  .catch(err => console.error('Make error:', err));

function drawTable(records) {
  // Si jamais vous aviez laissé Make renvoyer tout le jeu,
  // décommentez la ligne suivante :
  records = records.slice(0, 10);

  if (!records.length) return;

  const thead = document.querySelector('#records thead');
  const tbody = document.querySelector('#records tbody');

  // --- 1. En-tête : les noms de champs de la première ligne ---
  const fieldNames = Object.keys(records[0].fields);
  thead.innerHTML =
    '<tr>' + fieldNames.map(name => `<th>${name}</th>`).join('') + '</tr>';

  // --- 2. Corps du tableau ---
  const rowsHtml = records.map(rec =>
    '<tr>' +
      fieldNames.map(name => `<td>${rec.fields[name] ?? ''}</td>`).join('') +
    '</tr>'
  ).join('');

  tbody.innerHTML = rowsHtml;
}
