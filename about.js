let form = document.querySelector('#form')
let title = document.querySelector('#title');
let description = document.querySelector('#description');
let image_url = document.querySelector('#image_url');
let category = document.querySelector('#category');
let condition = document.querySelector('#condition');
let hero = document.querySelector('#hero');
let dataFetch = async () => {
    let response = await fetch('https://effective-mobile.duckdns.org/api/ads/')
    hero.innerHTML = '';
    let data = await response.json();
    console.log(data);
    getData(data.results);

}
dataFetch()

    function getData(data) {
    data.forEach((item,index) => {
        let li = document.createElement('li');

        li.innerHTML = `<div class="bg-red-100 rounded-md p-4 cursor-pointer ">
    <p class="hover:text-red-300 font-bold">
    <span>${index+1}</span>
    ${item.title}
    </p>
    <p class="hover:text-white font-normal">${item.description.length > 10 ? item.description.slice(0,10) + "" :item.description}</p>
    <img class="w-[200px] rounded-lg mt-[20px]  h-[200px] " src="${item.image_url ? item.image_url : "./car.jpg"}" alt="${item.image_url }">
    <button data-id="${item.id}" class="btn_delete bg-red-500 p-4 w-full text-white cursor-pointer duration-150 mt-4 rounded-md hover:bg-blue-400">
         Delete  ${item.id}</button>
    <button data-id="${item.id}" class="btn_edit bg-yellow-500 p-4 w-full text-white cursor-pointer duration-150 mt-4 rounded-md hover:bg-yellow-700">
         Edit </button>

    <div/>
`

        hero.append(li);
    })

        let buttons = document.querySelectorAll('.btn_delete');
        let btn_edit = document.querySelectorAll('.btn_edit');
        buttons.forEach(button => {
            button.addEventListener('click', async (e) => {
                let id = e.target.getAttribute('data-id');
                await deleteId(id);
            });
        });

        btn_edit.forEach(editId => {
            editId.addEventListener('click', async (e) => {
                let id = e.target.getAttribute('data-id');
                await editAction(id)

            });
        });




    }
    async function editAction(id) {
    let response = await fetch(`https://effective-mobile.duckdns.org/api/ads/${id}/`)
     let data = await response.json();
    title.value = data.title;
    description.value = data.description;
    category.value = data.category;
    condition.value = data.condition;
    image_url.value = data.image_url;



    }




    async function  deleteId(id) {
        let Delete = async  ()=> {
            let res = await fetch(`https://effective-mobile.duckdns.org/api/ads/${id}/`,{
                method: 'DELETE',
            })
            if (res.ok){
                alert("o'chirildi")
                dataFetch()
            }
        }
        Delete()
    }






    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let postData = async ()=>{
            let post = await fetch('https://effective-mobile.duckdns.org/api/ads/',{
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    title: title.value,
                    description: description.value,
                    image_url: image_url.value,
                    category: category.value,
                    condition: condition.value,
                })
            })
            if (post.ok){
                console.log('success');
                dataFetch()


            }

        }

        postData()
        dataFetch()

    })
