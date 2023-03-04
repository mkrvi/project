let songs = [
    {
        name: 'The Perfect Girl',
        isLiked: false,
    },
    {
        name: 'CtrlAltDelete',
        isLiked: true,
    },
    {
        name: 'Kerosene',
        isLiked: false
    }
];

window.addEventListener('load', function () {
    for (let song of songs) {
        createLi(song);
        addNewSong();
        countAllSongs();
    }
})

function createButton(name, className, clickEvent) {
    const button = document.createElement('button');
    button.textContent = name;
    button.classList.add('button');
    button.classList.add(className);
    button.addEventListener('click', clickEvent);
    return button;
}

function addImg() {
    const img = document.createElement("img")
    img.setAttribute('src','like.svg')
    img.classList.add('like-icon')
    return img
}

function createLi(song) {
    const li = document.createElement('li');
    li.classList.add('item');
    li.textContent = song.name;
    const imgBox = document.createElement('div');
    li.prepend(imgBox);
    const likeIcon = addImg();
    imgBox.append(likeIcon);
    const btnBox = document.createElement('div');
    btnBox.classList.add('btn-box');
    li.append(btnBox);
    btnBox.prepend(createButton('Delete', 'delete', deleteSong));
    if (song.isLiked) {
        btnBox.prepend(createButton('Unlike', 'like', likeSong));
    } else {
        btnBox.prepend(createButton('Like', 'like', likeSong));
        likeIcon.classList.add('hidden');
    }
    let ul = document.querySelector('.songs');
    ul.append(li)
    return li
}

function addNewSong() {
    const addSong = document.querySelector('.add');
    const warning = document.createElement('p')
    addSong.after(warning)
    addSong.addEventListener('click', function () {
        const songInput = document.querySelector('.input-box');
        const newSong = {name: songInput.value, isLiked: false};
        if (songInput.value.length < 3) {
            warning.textContent = 'Please enter song name with 3 or more symbols'
            warning.classList.remove('d-none')
        } else {
            createLi(newSong);
            songs.push(newSong);
            warning.classList.add('d-none')
            countAllSongs()
        }
        songInput.value = '';
    })
}

function likeSong(event) {
    if (event.target.textContent === 'Like') {
        event.target.textContent = 'Unlike'
    } else {
        event.target.textContent = 'Like'
    }
    const liToLike = event.target.closest('li')
    const icon = liToLike.querySelector('.like-icon');
    icon.classList.toggle('hidden')
}

function countAllSongs() {
    const allSongs = document.querySelectorAll('.item');
    let result = document.querySelector('.count')
    result.textContent = `${allSongs.length}`
    return result
}

function deleteSong(event) {
    const liToDel = event.target.closest('li')
    const index = Array.from(liToDel.parentNode.childNodes).indexOf(liToDel);
    songs = songs.slice(0, index).concat(songs.slice(index + 1));
    const confirmation = confirm(`Are you sure delete the song ${liToDel.textContent}?`);
    if (confirmation) {
        liToDel.remove();
    }
    countAllSongs();
}