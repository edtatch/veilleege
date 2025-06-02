// Remplacez l'URL par le webhook Make que vous venez de copier
const ENDPOINT = 'https://hook.eu2.make.com/swqey9y3lq48p2y9jinbkf728cxa617t';

fetch(ENDPOINT)
  .then(r => r.ok ? r.json() : Promise.reject(r))
  .then(data => {
    const list = document.getElementById('records');
    data.forEach(rec => {
      const li = document.createElement('li');
      li.textContent = `${rec.fields.Nom} — ${rec.fields.Email}`;
      list.appendChild(li);
    });
  })
  .catch(err => console.error('Erreur Make :', err));
