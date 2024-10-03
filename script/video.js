const getTimeString = (time) => {
    const hour = parseInt(time / 3600);
    const seconds = parseInt(time % 3600)
    const minute = parseInt(seconds / 60)
    // const second = (seconds % 60)
    return `${hour}hrs ${minute} minutes`;
}

// 1. Fetch, Load and Show Categories in HTML
// create loadCategories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error))
};
// create loadVideo
const loadVideos = () => {
    // fetch the video data
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then((data) => displayVideos(data.videos))
        .catch((error) => console.log(error))
};

const loadCategoryVideos = (id) => {
    // fetch the video data
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then((data) => displayVideos(data.category))
        .catch((error) => console.log(error))
};

// create displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('category')
    categories.forEach((item) => {
        // create button for each items
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
        <button onclick="loadCategoryVideos(${item.category_id})" id="${item.category_id}" class="btn">${item.category}</button>
        `
        // add button to category section
        categoryContainer.append(buttonContainer)
    })

};

// load videos and show in html
const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    // create a container div for videos
    videos.forEach((video) => {
        // console.log(video);
        const div = document.createElement('div');

        div.classList = "card card-compact rounded-lg cursor-pointer"
        div.innerHTML = `
        <figure class="h-[200px] relative rounded-lg">
            <img
                src=${video.thumbnail}
                class="h-full w-full object-cover"
                alt="Shoes" />
            ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute text-xs px-1 bottom-2 right-2 bg-black text-white rounded-sm">${getTimeString(video.others.posted_date)}</span >`
            }
        </figure >
        <div class="flex gap-3 px-0 py-3">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex gap-1 items-center">
                    <p class="text-sm text-gray-400">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified === true ? `<img class="w-4 h-4 rounded-full object-cover overflow-hidden" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>` : ""}
                </div>
                <p></p>
            </div>
        </div>
        `
        videoContainer.append(div)
    });

};

// call function
loadCategories()
loadVideos()
loadCategoryVideos()