const id = 'firma';
const res = {
    firma: { location: 'http://localhost/ajax/', name: 'firma.json', type: 'json' },
    test: { location: 'http://localhost/ajax/', name: 'test.txt', type: 'text' }
};

let data = null;
// const url = 'http://edu.gplweb.pl/res/web-app-ajax/test.txt'; // błąd CORS: Cross-Origin Resource Sharing
// const url = 'http://localhost/ajax/firma.json';
const url = res[id].location + res[id].name;

function getBundle() {
    // stworzenie obiektu do komunikacji
    const xhr = new XMLHttpRequest();
    // ustawienie formatu danych odpowiedzi
    xhr.responseType = res[id].type; // domyslnie text
    // formaty: text, json, document, blob, arraybuffer

    // skonfigurowanie polaczenia
    xhr.open('GET', url, async = true);
    // GET - pobranie: data = null
    // POST - wysłanie: data = document.form[]
    xhr.send(); // "wyslac polaczenie"

    console.log(xhr.response); // pusto

    // nasluchiwanie zmiany statusu gotowosci i obsluga odpowiedniego kod odpowiedzi
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState !== 4) {
            // komunikaty dla uzytkownika
            console.log(xhr.readyState);
        } else if (xhr.status === 200) {
            console.log('są kalesonki są');
            console.log(xhr.response); // zasob
        } else if (xhr.status === 404) {
            console.log('Brak zasobu / błędy URL');
        } else if (xhr.status === 500) {
            console.log('serwer odpadł');
        } else if (xhr.status === 503) {
            console.log('Retry in 3, 2, 1...');
        }
    });

    // nasluchiwanie zaladowania zasobu
    xhr.addEventListener('load', function () {
        console.log(xhr.response); // zasob
        data = xhr.response;
        if (data !== null) {
            let i = 0;
            let t1 = setInterval(() => {
                if (i === (data.length - 1)) clearInterval(t1);
                insItem(i + 1, data[i++]);
            }, 500);
            // data.forEach(item => insItem(i++, item));
            setStatusBar();
        }
    });
}

function insItem(i, item) {
    let docFrag = document.querySelector('template#rowTplt').content;
    // content - wlasciwosc read-only znacznika template, zawiera #document-fragment
    let row = docFrag.cloneNode(true);  // true - gleboka kopia: wezel, atrybuty i potomstwo
    row.querySelector('#row-').id += i; // <div id="row-1"> row-2 row-3 ...
    let cells = row.querySelectorAll('p');
    cells[0].textContent = i;
    cells[1].textContent = item.imie;
    cells[2].textContent = item.nazwisko;
    cells[3].textContent = item.stanowisko;
    document.querySelector('#main').appendChild(row);
    addNavItem(i);
}

function setStatusBar() {
    document.querySelector('output#dType').textContent = res[id].type;
    document.querySelector('output#rows').textContent = data.length;
}

function addNavItem(number) {
    let a = document.createElement('a');
    a.href = '#row-' + number;
    a.style = 'margin-right: 0.25rem';
    a.textContent = number;
    document.querySelector('footer > nav').appendChild(a);
}

window.addEventListener('load', getBundle);