const formData = document.querySelector(".button");
const inpName = document.querySelector(".inp_name");
const inpPhoneNumber = document.querySelector(".inp_phone");
const inpEmail = document.querySelector(".inp_email");
const inpImageUrl = document.querySelector(".inp_image");


const setDataLS = newData => {
    const lsData = JSON.parse(localStorage.getItem("contacts"));
    if (!lsData) {
        localStorage.setItem("contacts", JSON.stringify([]));
    } else if (newData) {
        const dataArr = JSON.parse(localStorage.getItem("contacts"));
        dataArr.push(newData);
        localStorage.setItem("contacts", JSON.stringify(dataArr));
    }
};

setDataLS();

const setData = () => {
    if (
        !inpName.value.trim("") ||
        !inpPhoneNumber.value.trim("") ||
        !inpEmail.value.trim("") ||
        !inpImageUrl.value.trim("")
    ) {
        alert("Ошибка: Заполните все поля");
        return;
    } else {
        const newData = {
            name: inpName.value,
            phone: inpPhoneNumber.value,
            email: inpEmail.value,
            imageUrl: inpImageUrl.value,
        };
        setDataLS(newData);
        getDataLS();
        inpName.value = '';
        inpPhoneNumber.value = '';
        inpEmail.value = '';
        inpImageUrl.value = '';
    }
};

formData.addEventListener("click", setData);

const resultElem = document.querySelector('.result');

function getDataLS () {
    const data = JSON.parse(localStorage.getItem('contacts'));
    resultElem.innerHTML = '';
    data.forEach(
        item => 
        (resultElem.innerHTML +=
    <div class="card" style="width: 20rem;">
    <div class="card-body"></div>
    <div class = 'wrapper__card_list'>
        <img class = "image_card" src = "${item.imageUrl}">
        <h5 class="card-title">${item.name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${item.phone}</h6>
        <p class="card-text">${item.email}</p>
        <div class = "buttons">
            <button class="card-delete">DELETE</button>
            <button class="card-edit">EDIT</button>
        </div>
    </div>
    </div>
    </div>))
}

getDataLS();

resultElem.addEventListener('click', (event) => {
    if (event.target.classList.contains('card-delete')) {
        const cardElement = event.target.closest('.card');
        const cardName = cardElement.querySelector('.card-title').textContent;

        removeDataLS(cardName);

        cardElement.remove();
    }
});

const removeDataLS = (cardName) => {
    const dataArr = JSON.parse(localStorage.getItem('contacts'));
    const updatedData = dataArr.filter((item) => item.name !== cardName);
    localStorage.setItem('contacts', JSON.stringify(updatedData));
};

resultElem.addEventListener('click', (event) => {
    if (event.target.classList.contains('card-edit')) {
        const cardElement = event.target.closest('.card');
        const cardName = cardElement.querySelector('.card-title').textContent;

        const dataArr = JSON.parse(localStorage.getItem('contacts'));
        const cardData = dataArr.find((item) => item.name === cardName);

        inpName.value = cardData.name;
        inpPhoneNumber.value = cardData.phone;
        inpEmail.value = cardData.email;
        inpImageUrl.value = cardData.imageUrl;

        removeDataLS(cardName);
    }
});