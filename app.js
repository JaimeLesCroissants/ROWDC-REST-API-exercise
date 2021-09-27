const express=require("express");
const app=express();
app.use(express.static("public"));
let products=[];
let id=0;
app.use(express.json());

app.get('/products',(req,res)=>{
	res.send(products);
});

app.post('/products',(req,res)=>{
	let newProd=req.body;
	newProd.id=id;
	id++;
	products.push(newProd);
	res.send("added");
});

app.put('/products/:id',(req,res)=>{
	let productId=+req.params.id;
	let success=false;
	for(let i=0;i<products.length;i++){
		if(products[i].id===productId){
			products[i].price=req.body.price;
			success=true;
			break;
		}
	}
	if(success){
		res.send("updated");
	}else{
		res.send("product not found");
	}
});

app.delete('/products/:id',(req,res)=>{
	for(let i=0;i<products.length;i++){
		if(products[i].id===+req.params.id){
			products.splice(i,1);
			res.send("deleted");
			break;
		}
	}
	res.send("product not found");
});

app.listen(3000,()=>{
	console.log("started");
});