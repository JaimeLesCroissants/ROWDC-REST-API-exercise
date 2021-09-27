let showBtn=document.getElementById("show");
let lst=document.getElementById("list");
let addBtn=document.getElementById("add-but");
let updBtn=document.getElementById("upd-but");
let delBtn=document.getElementById("del-but");

showBtn.addEventListener("click",(e)=>{
	lst.innerHTML="";
	fetch("http://localhost:3000/products")
		.then(res=>res.json()).then(data=>{
			data.forEach(elem=>{
				let li=document.createElement("li");
				li.textContent=`${elem.id} - ${elem.product} $${elem.price}`;
				lst.appendChild(li);
			})
		})
})

addBtn.addEventListener("click",(e)=>{
	
	fetch("http://localhost:3000/products",{
		method:"POST",
		headers:{
			"Content-type":"application/json"
		},
		body:JSON.stringify({
			product:document.getElementById("productAdd").value,
			price:document.getElementById("priceAdd").value
		})
	}).then(res=>res.text()).then(data=>console.log(data));
	document.getElementById("productAdd").value="";
	document.getElementById("priceAdd").value="";
})

updBtn.addEventListener("click",(e)=>{
	let id=document.getElementById("productUpd").value;
	fetch("http://localhost:3000/products/"+id,{
		method:"PUT",
		headers:{
			"Content-type":"application/json" 
		},
		body:JSON.stringify({
			price:document.getElementById("priceUpd").value
		})
	}).then(res=>res.text()).then(data=>console.log(data));
	document.getElementById("productUpd").value="";
	document.getElementById("priceUpd").value="";
})
delBtn.addEventListener("click",(e)=>{
	let id=document.getElementById("productDel").value;
	fetch("http://localhost:3000/products/"+id,{
		method:"DELETE"
	}).then(res=>res.text()).then(data=>console.log(data));
	document.getElementById("productDel").value="";
})