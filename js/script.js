const loadPhone = async (searchText, limitData) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${(searchText) ? searchText : 'a'}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  showPhone(data.data, limitData);
};

const showPhone = (phones, limitData) => {
  console.log(phones);

  if (phones.length === 0) {
    document.getElementById('no-found-massage').classList.remove('hidden');
  }
  else {
    document.getElementById('no-found-massage').classList.add('hidden');
  }

  const cardContainer = document.getElementById('card-container');

  const loadMore = document.getElementById('load-more-btn');

  if (limitData && phones.length > 16) {
    phones = phones.slice(0, 16);
    loadMore.classList.remove('hidden');
  }
  else (
    loadMore.classList.add('hidden')
  )

  phones.forEach(phone => {
    const { image, phone_name, slug } = phone;
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card bg-base-200 shadow-xl overflow-hidden">
      <img src="${image}" alt="Shoes" />
      <div class="card-body">
        <h2 class="card-title">${phone_name}</h2>
        <div class="card-actions justify-end">
          <label for="my-modal" onclick="detailsPhone('${slug}')" class="btn btn-primary">show details</label>
        </div>
      </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
  spinner(false);
};

const spinner = isSpin => {
  const spinner = document.getElementById('spinner');
  if (isSpin) {
    spinner.classList.remove('hidden');
  }
  else {
    spinner.classList.add('hidden');
  }
};

const searchData = (limitData) => {
  spinner(true);
  const searchFild = document.getElementById('search-fild').value;
  loadPhone(searchFild, limitData);
  document.getElementById('card-container').innerHTML = '';
};

const searchPhone = () => {
  searchData(16);
};

document.getElementById('search-fild').addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchData(16);
  }
});

document.getElementById('load-more-btn').addEventListener('click', function () {
  searchData();
});

const detailsPhone = async id => {
  const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  modalFuntion(data.data);
}

const modalFuntion = (details) => {
  console.log('click');

  const { image, name, brand, releaseDate } = details;
  const features = details.mainFeatures;
  const { chipSet, displaySize, memory, storage } = features;
  const others = details.others;
  const { Bluetooth, GPS, NFC, WLAN } = others;


  document.getElementById('modal-img').setAttribute('src', `${image}`);
  document.getElementById('brand').innerText = brand;
  document.getElementById('name').innerText = name;
  document.getElementById('releaseDate').innerText = releaseDate;
  document.getElementById('chipSet').innerText = chipSet;
  document.getElementById('displaySize').innerText = displaySize;
  document.getElementById('memory').innerText = memory;
  document.getElementById('storage').innerText = storage;
  document.getElementById('bluetooth').innerText = Bluetooth;
  document.getElementById('gps').innerText = GPS;
  document.getElementById('nfc').innerText = NFC;
  document.getElementById('wlan').innerText = WLAN;

};