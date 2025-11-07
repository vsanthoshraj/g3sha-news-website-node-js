document.addEventListener("DOMContentLoaded", () => {
  fetchNews("technology");
  const techNav = document.getElementById("technology");
  techNav?.classList.add("active");
  window.curSelectedNav = techNav;

  const searchButton = document.getElementById("search-button");
  const searchText = document.getElementById("search-text");

  searchButton.addEventListener("click", () => {
    const query = searchText.value.trim();
    if (query) {
      fetchNews(query);
      if (window.curSelectedNav) window.curSelectedNav.classList.remove("active");
      window.curSelectedNav = null;
    }
  });

  searchText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const query = searchText.value.trim();
      if (query) {
        fetchNews(query);
        if (window.curSelectedNav) window.curSelectedNav.classList.remove("active");
        window.curSelectedNav = null;
      }
    }
  });
});

const url = "/api/news?q=";

async function fetchNews(query) {
  const cardsContainer = document.getElementById("cardscontainer");
  if (!cardsContainer) return;

  showLoadingIndicator();

  try {
    const res = await fetch(url + encodeURIComponent(query));
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    if (data.status === "error") throw new Error(data.message);

    bindData(data.articles);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoadingIndicator();
  }
}

function showLoadingIndicator() {
  const cardsContainer = document.getElementById("cardscontainer");
  cardsContainer.innerHTML = '<div class="loading">Loading news...</div>';
}

function hideLoadingIndicator() {
  const loadingDiv = document.querySelector(".loading");
  if (loadingDiv) loadingDiv.remove();
}

function showError(message) {
  const cardsContainer = document.getElementById("cardscontainer");
  cardsContainer.innerHTML = `<div class="error">Error: ${message}</div>`;
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cardscontainer");
  const newsCardTemplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";

  if (!articles || articles.length === 0) {
    cardsContainer.innerHTML = '<div class="no-results">No news found</div>';
    return;
  }

  articles.forEach((article) => {
    if (!article.urlToImage || !article.description) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector(".news-img");
  const newsTitle = cardClone.querySelector(".news-title");
  const newsSource = cardClone.querySelector(".news-source");
  const newsDesc = cardClone.querySelector(".news-desc");

  newsImg.src = article.urlToImage;
  newsImg.onerror = function () {
    this.src = "./images/fallback-image.jpg";
  };

  newsTitle.innerHTML = truncateText(article.title, 60);
  newsDesc.innerHTML = truncateText(article.description, 150);

  const date = new Date(article.publishedAt).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

function truncateText(text, maxLength) {
  if (!text) return "";
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}

function onNavItemClick(id) {
  const navItem = document.getElementById(id);
  if (navItem === window.curSelectedNav) return;

  fetchNews(id);
  if (window.curSelectedNav) window.curSelectedNav.classList.remove("active");
  window.curSelectedNav = navItem;
  window.curSelectedNav.classList.add("active");
}
