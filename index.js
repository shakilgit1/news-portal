const handleCategory = async () =>{
     const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
     const data = await res.json();
     const categories = data.data.news_category.slice(0,3);
     const tabContainer = document.getElementById('tab-container');

      // console.log(categories);
     categories.forEach((category) => {
      //   console.log(category);
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick ="ShowNews('${category.category_id}')" class="tab text-2xl">${category.category_name}</a>        
        `;
        tabContainer.appendChild(div);
     })
}

const ShowNews = async (news) =>{
     
     const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${news}`);
     const data = await res.json();
     const newsData = data.data;
   //   console.log(data.data);
     const newsCards = document.getElementById('card-container');
      newsCards.innerHTML = '';
      
      newsData.forEach((id) => {
        //  console.log(id);
         const div = document.createElement('div');
         div.innerHTML = `

         <div class="card w-96 bg-base-100 shadow-xl">
          <figure><img src="${id.image_url}" alt="Shoes" /></figure>
          <div class="card-body">
            <h2 class="card-title">
              ${id.title.slice(0,40)}
              <div class="badge badge-secondary p-4">${id.rating?.badge}</div>
            </h2>
            <p>${id.details.slice(0,50)}</p>
            <p><span>Total views:</span> ${id.total_view? id.total_view: 'no views'}</p>
            <div class="card-actions justify-between">
               <div class="flex">
                <div class = w-14 ><img src="${id.author?.img}" alt="coming" class = "rounded-full"></div>
                 <div>
                  <h4>${id.author?.name? id.author?.name.slice(0,15) : 'no name'}</h4>
                  <p>${id.author?.published_date? id.author?.published_date : 'no date'}</p>
                 </div>
               </div>
              <button onclick ="modal('${id._id}')" class="btn btn-neutral">details</button>
            </div>
          </div>
        </div>
         
         `;
         newsCards.appendChild(div);
      })
}


// modal
const modal = async (newsId) =>{
      // console.log(newsId);
      const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
      const data = await res.json();
      const moreData = data.data[0];
      // console.log(moreData);
 
      const modalContainer = document.getElementById('modal-container');
      const div = document.createElement('div');
      div.innerHTML = ` 
      
      <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <form method="dialog" class="modal-box">
          <h3 class="font-bold text-lg">Hello!</h3>
          <img src = "${moreData.image_url}" alt="img">
          <p class="py-4"></p>
          <div class="modal-action">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </div>
        </form>
      </dialog>
      `;

        modalContainer.appendChild(div);
        const showing = document.getElementById('my_modal_5');
        showing.showModal();
 
};
ShowNews('01');
handleCategory();

