
document.addEventListener('DOMContentLoaded', ()=>{
    updatePosts();
})




//Evento para o botão enviar
let button = document.getElementById('button');

button.addEventListener('click', newPost);

document.addEventListener('keydown', (event)=>
{
    if (event.key == 'Enter'){
            if ( document.getElementById('title').value != "" &&
            document.getElementById('description').value != ""){
                newPost();
            } else{
                alert("Preencha todos os campos para o item ser adicionado :)")
            }
    }   
})


function newPost() {

    

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    if (title != '' && description != '')

   { let post = {title, description};

    const options = {method: "POST",
                    headers: new Headers({'content-type': 'application/json'}),
                    body: JSON.stringify(post)
                };


    fetch('http://10.0.0.124:3000/api/new' , options).then( res =>{
        console.log(res);
        updatePosts();

        document.getElementById('title').value = "";
        document.getElementById('description').value = "";
    })
   } else{
       alert("Não deixe nenhum campo vazio :)")
   }

}

function updatePosts(){

    fetch('http://10.0.0.124:3000/api/all').then(
            res =>{
                return res.json();
            }
        ).then(json =>{
         
            let postElements='';
    
            let posts = JSON.parse(json);
    
            posts.forEach((post)=>{
                                        let postElement = `     <div class='col'>
                                                                <div class="card mb-4">
                                                                <div class='card-header'>
                                                                    <h5 class='card-title'>${post.title}</h5>
                                                                </div>
                                                                <div class='card-body'>
                                                                    <div class='card-text'>
                                                                        ${post.description}
                                                                    </div>
                                                                    <div class='d-flex justify-content-end me-2'>
                                                                    <button class='btn btn-primary rounded-circle' id='${post.id}' onclick='deletePost(this)'><i class='far fa-trash-alt fs-3'></i></button>
                                                                    </div>
                                                                </div>
                                                                </div>
                                                            </div>`;
                                        postElements += postElement;
                                                            })
    
            let divPosts = document.getElementById('posts');
            divPosts.innerHTML = postElements;
        })
    
    }
    
    function deletePost(Element){
        let id = Element.id;
        const options = {method: "DELETE"};
        fetch(`http://10.0.0.124:3000/api/delete/${id}` , options).then( res =>{
            console.log(res);
             updatePosts();
            })
    }