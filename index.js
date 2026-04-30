
// const customer = [
//     { id: 1, name: "supino reto", muscle: "Peito" },
//     { id: 2, name: "Crucifixo voador", muscle: "Peito" },
//     { id: 3, name: "Puxada Reta", muscle: "Costas" }
// ]
// // 1 - Listando registros (GET)
// server.get("/customers", (req, res) => {
//     return res.json(customer)
// })
// server.get("/customers/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const customerId = customer.find((exercise) => exercise.id === id)
//     const status = customerId ? 200 : 404
//     console.log("GET /customers/:id", customerId)
//     return res.status(status).json(customerId)
// })
// // 2 - Criando novo registro (POST)
// server.post("/customers", (req, res) => {
//     const { id, name, muscle } = req.body;
//     const nextId = customer[customer.length - 1].id + 1
//     const exercise = { id: nextId, name, muscle }
//     customer.push(exercise)
//     console.debug("POST /customers", exercise)
//     return res.status(201).json(exercise)
// })
// // 3 - Atualizando um item (PUT)
// server.put("/customers/:id", (req, res) => {
//     const id = parseInt(req.params.id)
//     const { name, muscle } = req.body;
//     const index = customer.findIndex((item) => item.id === id)


//     const status = index >= 0 ? 200 : 404
//     if (index >= 0) {
//         customer[index] = { id: parseInt(id), name, muscle }
//     }
//     return res.status(status).json(customer[index])

// })
// // 4 - Deletando customer (DELETE)
// server.delete("/customers/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const index = customer.findIndex((item) => item.id === id)
//     const status = index >= 0 ? 200 : 404
//     if (index >= 0) {
//         customer.splice(index, 1)
//     }
//     return res.status(status).json()
// })
