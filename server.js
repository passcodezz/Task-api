const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./data/db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

server.use(middlewares);
// server.use(router);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (
    req.path.startsWith("/product") &&
    // req.path.startsWith("/automation") &&
    req.headers["authorization"] !== "Bearer abcd"
  ) {
    return res.status(401).json({ error: "Must pass token" });
  }

  next();
});
// server.use((req, res, next) => {
//   if (
//     req.path.startsWith("/test") &&
//     // req.path.startsWith("/automation") &&
//     req.headers["authorization"] !== "Bearer abcd"
//   ) {
//     return res.status(401).json({ error: "Must pass token" });
//   }

//   next();
// });
server.use(router);

server.listen(port);
// json-server --watch db.json --port 8080
// server.listen(8080, () => {
//   console.log("Running on http://localhost:3000");
// });
