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
const server = http.createServer((req, res) => {
  return req
    .pipe(new InverseNumberStream()) // Transform the stream to inverse the numbers
    .pipe(res); // Pipe the stream to the response
});

server.listen(3334);
