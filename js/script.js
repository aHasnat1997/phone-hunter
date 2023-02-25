const loadPhone = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${(searchText) ? searchText : 'a'}`;
  console.log(url);
  const res = await fetch(url);
  const data = await res.json();
  showPhone(data.data);
};

const showPhone = phones => {
  console.log(phones);

  if (phones.length === 0) {
    document.getElementById('no-found-massage').classList.remove('hidden');
  }
  else {
    document.getElementById('no-found-massage').classList.add('hidden');
  }

  const cardContainer = document.getElementById('card-container');

  phones.forEach(phone => {
    const { image, phone_name } = phone;
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card bg-base-200 shadow-xl overflow-hidden">
      <img src="${image}" alt="Shoes" />
      <div class="card-body">
        <h2 class="card-title">${phone_name}</h2>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
  document.getElementById('search-fild').value = '';
  spinner(false);
};

const searchPhone = () => {
  spinner(true);
  const searchFild = document.getElementById('search-fild').value;
  loadPhone(searchFild);
  document.getElementById('card-container').innerHTML = '';
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
