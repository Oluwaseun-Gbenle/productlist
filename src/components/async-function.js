
export async function fetchData ({axios, setProducts}) {
await axios.get("https://productlist-rest-api.oluwaseun2020.repl.co/api/reorder")
.then((res) => {
  setProducts(res.data);
})
.catch((err) => console.log("Request Failed",err));
};

export async function createProduct ({axios,values}) {
  await axios.post("https://productlist-rest-api.oluwaseun2020.repl.co/api/reorder",values)
    .then((res) => {
      console.log("create", res);
    })
    .catch((err) => console.log("Request Failed", err));
  }

export async function updateProduct ({axios,values}) {
await axios.post("https://productlist-rest-api.oluwaseun2020.repl.co/api/reorder/update",values)
  .then((res) => {
    console.log("update", res);
  })
  .catch((err) => console.log("Request Failed", err));
}

export async function deleteProduct (axios,id) {
  await axios.delete(`https://productlist-rest-api.oluwaseun2020.repl.co/api/reorder/delete/${id}`)
    .then((res) => {
      console.log("delete", res);
    })
    .catch((err) => console.log("Request Failed", err));
  }
  