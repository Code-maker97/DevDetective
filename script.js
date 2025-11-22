const searchBtn = document.getElementById('btn');
const searchInput = document.getElementById('search');
const profileCard = document.getElementById('profile-card');
const errorMsg = document.getElementById('error');

// API URL
const url = 'https://api.github.com/users/';

searchBtn.addEventListener('click', () => {
    const user = searchInput.value;
    if (user) {
        getUser(user);
    }
});

// Allow "Enter" key to search
searchInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        const user = searchInput.value;
        if (user) getUser(user);
    }
})

async function getUser(username) {
    try {
        const response = await fetch(url + username);
        const data = await response.json();

        if(response.ok) {
            renderCard(data);
            errorMsg.classList.add('hidden');
        } else {
            profileCard.classList.add('hidden');
            errorMsg.classList.remove('hidden');
        }
    } catch (error) {
        console.log(error);
    }
}

function renderCard(data) {
    profileCard.classList.remove('hidden');
    
    document.getElementById('avatar').src = data.avatar_url;
    document.getElementById('name').innerText = data.name || data.login;
    document.getElementById('login').innerText = `@${data.login}`;
    document.getElementById('login').href = data.html_url;
    document.getElementById('bio').innerText = data.bio || "This profile has no bio";
    
    document.getElementById('repos').innerText = data.public_repos;
    document.getElementById('followers').innerText = data.followers;
    document.getElementById('following').innerText = data.following;
}