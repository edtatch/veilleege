// Remplacez par l’URL de votre webhook Make
const ENDPOINT = 'https://hook.eu2.make.com/swqey9y3lq48p2y9jinbkf728cxa617t';

fetch(ENDPOINT)
  .then(r => r.ok ? r.json() : Promise.reject(r))
  .then(drawTable)                 // ← même fonction, mais réécrite ci-dessous
  .catch(err => console.error('Make error:', err));

function drawTable(records) {
  if (!records.length) return;

  // ---- 1. Construire la liste complète des champs ----
  const fieldSet = new Set();
  records.forEach(rec =>
    Object.keys(rec.fields).forEach(name => fieldSet.add(name))
  );
  const fieldNames = Array.from(fieldSet);        // ordre arbitraire

  // ---- 2. Insérer le header ----
  const thead = document.querySelector('#records thead');
  thead.innerHTML =
    '<tr>' + fieldNames.map(n => `<th>${n}</th>`).join('') + '</tr>';

  // ---- 3. Insérer les lignes ----
  const tbody = document.querySelector('#records tbody');
  tbody.innerHTML = records.map(rec => (
    '<tr>' +
      fieldNames.map(name =>
        `<td>${rec.fields[name] ?? ''}</td>`          // vide si champ absent
      ).join('') +
    '</tr>'
  )).join('');
}
