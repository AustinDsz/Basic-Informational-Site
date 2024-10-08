const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    // /
    // if(req.url === '/'){
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content)=>{
    //         if (err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html'});
    //         res.end(content);
    //     });
        
    // }

    // /about
    // if(req.url === '/about'){
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content)=>{
    //         if (err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/html'});
    //         res.end(content);
    //     });
    // }

    // /api/users
    // if(req.url === '/api/users'){
    //     const users = [
    //         { name: 'Bob smith', age: 40},
    //         { name: 'John Doe', age: 30},
    //     ];
    //     res.writeHead(200, { 'Content-Type': 'application/json'});
    //     res.end(JSON.stringify(users));
    // }

    // Build file path
    let url = {
        "/": "index.html",
        "/about": "about.html",
        "/contact-me": "contact-me.html",
    }

    let filePath = path.join(__dirname, 'public', req.url in url ? url[req.url]: req.url)

    console.log(filePath);
    

    // Extension of file
    let extname = path.extname(filePath);

    // initial content type
    let contentType = 'text/html';

    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        
        case '.css':
            contentType = 'text/css';
            break;
        
        case '.json':
            contentType = 'text/json';
            break;
        
        case '.png':
            contentType = 'text/png';
            break;
        
        case '.jpg':
            contentType = 'text/jpg';
            break;
    }

    // Read file
    fs.readFile(filePath, (err, content)=>{
        if (err) {
            if (err.code === 'ENOENT'){
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content)=>{
                    res.writeHead(200, { 'Content-Type': contentType});
                    res.end(content, 'utf8');
                });
            }else{
                // some server error
                res.writeHead(500);
                res.end(`Server error: ${err.code}`);
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(content, 'utf8');

        }
    });

    
});

const PORT=process.env.PORT || 8080;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
