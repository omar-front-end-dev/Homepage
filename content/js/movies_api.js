const base_url ="https://api.tvmaze.com/shows";
const search_form = document.querySelector("#search_form");


async function fetchMovies(api) {
    const response = await fetch(api);
    const data = await response.json();
    setCarousel(data);
    getMovieDetails(data)
    get_topics(data)
    trending_episodes(data)
};



async function setCarousel(movies) {
    const carousel = document.querySelector(".owl-carousel");
    let carouselItems = movies.slice(0, 20);

    await carouselItems.map(movie => { 
        carousel.innerHTML +=`
            <div class="owl-carousel-info-wrap item">
                <img src=${movie.image.original} class="owl-carousel-image img-fluid" alt="">
                <div class="owl-carousel-info">
                    <h6 class="mb-2">
                        ${movie.name}
                        <img src="content/images/verified.png" class="owl-carousel-verified-image img-fluid" alt="">
                    </h6>
                    <span class="badge">Storytelling</span>
                    <span class="badge">Business</span>
                </div>
            </div>
        `;
    });


    $('.owl-carousel').owlCarousel({
        center: true,
        loop: true,
        margin: 30,
        autoplay: true,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1,
            },
            767:{
                items: 2,
            },
            1200:{
                items: 4,
            }
        }
    });
}

function getMovieDetails(movies) {
    const latest_episodes = document.querySelector(".latest_episodes");
    let latestItems = movies.slice(102, 104);
    latestItems.map(movies =>{
        latest_episodes.innerHTML += `
            <div class="col-lg-6 col-12 mb-4 mb-lg-0">
                <div class="custom-block d-flex">
                    <div class="">
                        <div class="custom-block-icon-wrap">
                            <div class="section-overlay"></div>
                            <a href="detail-page.html" class="custom-block-image-wrap">
                                <img src=${movies.image.medium} class="custom-block-image img-fluid" alt="">

                                <a href="#" class="custom-block-icon">
                                    <i class="bi-play-fill"></i>
                                </a>
                            </a>
                        </div>

                        <div class="mt-2">
                            <a href="#" class="btn custom-btn">
                                Subscribe
                            </a>
                        </div>
                    </div>

                    <div class="custom-block-info">
                        <div class="custom-block-top d-flex mb-1">
                            <small class="me-4">
                                <i class="bi-clock-fill custom-icon"></i>
                                ${movies.runtime} Minutes
                            </small><small>Episode <span class="badge">15</span></small>
                        </div>

                        <h5 class="mb-2">
                            <a href="detail-page.html">
                                ${movies.name}
                            </a>
                        </h5>
                        <div class="profile-block d-flex">
                            <img src=${movies.image.medium} class="profile-block-image img-fluid" alt="">
                            <p>
                            <strong>Company</strong>
                            ${movies.network.name}
                            <img src="content/images/verified.png" class="verified-image img-fluid" alt="">
                            </p>
                        </div>
                        ${movies.summary.slice(0, 90)}
                        <div class="custom-block-bottom d-flex justify-content-between mt-3">
                            <a href="#" class="bi-headphones me-1">
                                <span>120k</span>
                            </a>

                            <a href="#" class="bi-heart me-1">
                                <span>42.5k</span>
                            </a>

                            <a href="#" class="bi-chat me-1">
                                <span>11k</span>
                            </a>

                            <a href="#" class="bi-download">
                                <span>50k</span>
                            </a>
                        </div>
                    </div>

                    <div class="d-flex flex-column ms-auto">
                        <a href="#" class="badge ms-auto">
                            <i class="bi-heart"></i>
                        </a>

                        <a href="#" class="badge ms-auto">
                            <i class="bi-bookmark"></i>
                        </a>
                    </div>
                </div>
            </div>
        `
    });
}


function get_topics(topic) {
    const topics_container = document.querySelector(".topics_container");
    let topicsItems = topic.slice(208, 212);
    topicsItems.map(topic =>{
        topics_container.innerHTML += `
            <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                <div class="custom-block custom-block-overlay">
                    <a href="detail-page.html" class="custom-block-image-wrap">
                        <img src=${topic.image.medium} class="custom-block-image img-fluid" alt="">
                    </a>

                    <div class="custom-block-info custom-block-overlay-info">
                        <h6 class="mb-1 fs-6">
                            <a href="listing-page.html">
                                ${topic.genres.join(" ")}
                            </a>
                        </h6>
                    </div>
                </div>
            </div>
        
        `
    })
}


function trending_episodes(trending) {
    const trending_episodes = document.querySelector(".trending-podcast__container");
    let trendingItems = trending.slice(140, 161);
    trendingItems.map(item =>{
        trending_episodes.innerHTML += `
            <div class="col-lg-4 col-12 mb-4">
                <div class="custom-block custom-block-full">
                    <div class="custom-block-image-wrap">
                        <a href="detail-page.html">
                            <img src=${item.image.original} class="custom-block-image img-fluid" alt="">
                        </a>
                    </div>

                <div class="custom-block-info">
                    <h6 class="mb-2 fs-5">
                        <a href="detail-page.html">
                            ${item.name}
                        </a>
                    </h6>
                    <p class="mb-0">
                       <strong>Category :</strong> ${item.genres.join("-")}
                    </p>
                    <div class="custom-block-bottom d-flex justify-content-between mt-3">
                        <a href="#" class="bi-headphones me-1">
                            <span>${item.externals.tvrage.toString().slice(2)}k</span>
                        </a>

                        <a href="#" class="bi-heart me-1">
                            <span>2${item.externals.thetvdb.toString().slice(4)}k</span>
                        </a>

                        <a href="#" class="bi-chat me-1">
                            <span>${item.externals.thetvdb.toString().slice(4)}k</span>
                        </a>
                    </div>
                </div>

                <div class="social-share d-flex flex-column ms-auto">
                    <a href="#" class="badge ms-auto">
                        <i class="bi-heart"></i>
                    </a>

                    <a href="#" class="badge ms-auto">
                        <i class="bi-bookmark"></i>
                    </a>
                </div>
            </div>
        </div>
    `
    })
}


fetchMovies(base_url);