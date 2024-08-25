window.addEventListener('load', () => {
    fetchNews('politics');
});

const button = document.getElementById('submit');
const lang = document.getElementById('lan');
const con = document.getElementById('con');
const cat = document.getElementById('pol');
let lan = "";
let cont = "";
let pol = "";

lang.addEventListener('change', (e) => {
    lan = e.target.value;
});

con.addEventListener('change', (e) => {
    cont = e.target.value;
});

cat.addEventListener('change', (e) => {
    pol = e.target.value;
});

button.addEventListener('click', () => {
    fetchNews(pol, cont, lan);
});

const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        const selectedCategory = e.target.getAttribute('data-category');
        fetchNews(selectedCategory);

        tabs.forEach(tab => tab.classList.remove('active'));
        e.target.classList.add('active');
    });
});

const fetchNews = (category = 'politics', country = 'in', language = 'en') => {
    const newsContainer = document.getElementById('news-container');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');

    loader.style.display = 'block'; // Show loader
    errorMessage.style.display = 'none'; // Hide any previous error
    
    fetch(`https://newsdata.io/api/1/latest?apikey=pub_516698330b8b61c32130753915340c9239249&country=${country}&category=${category}&language=${language}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            loader.style.display = 'none'; // Hide loader
            appendNews(data.results);
        })
        .catch(err => {
            loader.style.display = 'none'; // Hide loader
            errorMessage.style.display = 'block'; // Show error message
            console.error('Fetch error:', err);
        });
}

const appendNews = (news) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; 

    news.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';

        const title = document.createElement('h1');
        title.innerText = item.title;

        const image = document.createElement('img');
        image.src = item.image_url || 'sam.png';
        image.alt = item.title;

        const description = document.createElement('p');
        description.innerText = item.description;
        description.classList.add('addcol');

        const country = document.createElement('h3');
        country.innerText = item.country;

        newsItem.appendChild(title);
        newsItem.appendChild(image);
        newsItem.appendChild(description);
        newsItem.appendChild(country);

        newsContainer.appendChild(newsItem);
    });
}
