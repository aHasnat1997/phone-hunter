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
  document.getElementById('modal-body').innerHTML = `
  <p id="brand" class="card-title text-3xl">${brand}</p>
  <p id="name" class="card-title text-4xl my-2">${name}</p>
  <p id="releaseDate" class="card-title text-2xl">${releaseDate}</p>
  <div class="flex items-center mt-8">
    <p class="card-title text-2xl font-bold">Features</p>
    <hr class="w-full border-y-base-300 border-b-2" />
  </div>
  <div class="text-xl">
    <p>Chip Set : <span id="chipSet">${chipSet}</span></p>
    <p>Display : <span id="displaySize">${displaySize}</span></p>
    <p>Memory : <span id="memory">${memory}</span></p>
    <p>Storage : <span id="storage">${storage}</span></p>
  </div>
  <div class="flex items-center mt-8">
    <p class="card-title text-2xl font-bold">Others</p>
    <hr class="w-full border-y-base-300 border-b-2" />
  </div>
  <div class="text-xl">
    <p>Bluetooth : <span id="bluetooth">${Bluetooth}</span></p>
    <p>GPS : <span id="gps">${GPS}</span></p>
    <p>NFC : <span id="nfc">${NFC}</span></p>
    <p>WLAN : <span id="wlan">${WLAN}</span></p>
  </div> 
  `;






};

loadPhone('a', 16);