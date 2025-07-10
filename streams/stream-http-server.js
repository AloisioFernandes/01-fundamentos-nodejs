import http from "node:http";
import { Transform } from "node:stream";

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(`Transformed number: ${transformed}`);

    callback(null, Buffer.from(String(transformed)));
  }
}

// req => Readable stream
// res => Writable stream
const server = http.createServer(async(req,res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk); 
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(`Full stream content: ${fullStreamContent}`);

  return res.end(fullStreamContent); // Send the full content back as response
  
  return req
    .pipe(new InverseNumberStream()) // Transform the stream to inverse the numbers
    .pipe(res); // Pipe the stream to the response
});

server.listen(3334);
