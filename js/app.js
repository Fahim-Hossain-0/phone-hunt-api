const loadPhone = async (searchPhone) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
  const data = await res.json()
  // console.log(data.data)
  displayPhone(data.data)
}
const displayPhone = (phones) => {
  // console.log(phones)


  const seeMore = document.getElementById("see-more")
  // console.log(seeMore,'ok')
  if (phones.length > 6) {
    seeMore.classList.remove('hidden')
  }
  else {
    seeMore.classList.add('hidden')
  }

  phones = phones.slice(0, 6)
  const showPhone = document.getElementById('show-phone-container')
  showPhone.innerHTML = '';
  phones.forEach(phone => {
    // console.log(phone)
    const phoneDiv = document.createElement('div')
    phoneDiv.classList = `card bg-base-100 w-96 shadow-xl my-6`
    phoneDiv.innerHTML = ` <figure>
            <img
              src="${phone.image}"
              alt="Shoes"/>
          </figure>
          <div class="card-body text-center">
            <h2 class="card-title inline">${phone.phone_name}</h2>
            <p class="font-normal">There are many variations of passages of available, but the majority have suffered</p>
            <h4 class="font-bold text-[30px]">$999</h4>
            <div class="card-actions justify-center">
              <button onclick="show_details_modal.showModal(); showDetails('${phone.slug}')" class="btn btn-primary mt-3">Show Details</button>
            </div>
          </div> `

    showPhone.appendChild(phoneDiv)
  });
  loadingSpinner(false)
}

const searchPhone = () => {
  loadingSpinner(true)
  const searchInputField = document.getElementById("search-field")
  const searchText = searchInputField.value
  loadPhone(searchText)
  searchInputField.value = ''
  // console.log(searchText)
}

const loadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById('loading-spinner')
  if (isLoading) {
    loadingSpinner.classList.remove('hidden')
  }
  else {
    loadingSpinner.classList.add('hidden')
  }
}

const showDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  // console.log(data.data)
  showPhoneDetails(data.data)
}

const showPhoneDetails = (phone) => {
  console.log(phone)
  show_details_modal.showModal()
  const showPhoneDetailsContainer = document.getElementById('show_details_modal')
  // showPhoneDetailsContainer.innerHTML = '';
  const showPhoneDetails = document.createElement('div')
  showPhoneDetails.classList = `modal-box text-left`
  showPhoneDetails.innerHTML = `<img src="${phone.image}" alt="" class="mx-auto mt-8" >
    <h3 class="text-lg font-bold mt-16">${phone.name}</h3>
    <p class="my-4 text-base text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p class="font-semibold mt-4 text-[20px]">Storage : <span class="text-[#706F6F] font-normal">${phone.mainFeatures.storage}</span></p>
    <p class="font-semibold mt-4 text-[20px]">Display Size : <span class="text-[#706F6F] font-normal">${phone.mainFeatures.displaySize}</span></p>
    <p class="font-semibold mt-4 text-[20px]">Chipset : <span class="text-[#706F6F] font-normal">${phone.mainFeatures.chipSet}</span></p>
    <p class="font-semibold mt-4 text-[20px]">Memory : <span class="text-[#706F6F] font-normal">${phone.mainFeatures.memory}</span></p>
    <p class="font-semibold mt-4 text-[20px]">Slug : <span class="text-[#706F6F] font-normal">${phone.slug}</span></p>
    <p class="font-semibold mt-4 text-[20px]">Release data : <span class="text-[#706F6F] font-normal">${phone.releaseDate}</span></p>
    <p class="font-semibold mt-4 text-[20px]">Brand : <span class="text-[#706F6F] font-normal">${phone.brand}</span></p>
    <p class="font-semibold mt-4 text-[20px]">GPS : <span class="text-[#706F6F] font-normal">${phone.others.GPS}</span></p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>`
  showPhoneDetailsContainer.appendChild(showPhoneDetails)
}
loadPhone('13')