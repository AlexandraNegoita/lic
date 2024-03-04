import http from 'http';

export const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-type" : "application/json"});
    res.end(
        JSON.stringify({
            data: "It WORKS"
        })
    )
})

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000/");
})