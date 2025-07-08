import { Readable, Writable, Transform } from "node:stream";

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(`Transformed number: ${transformed}`);

    callback(null, Buffer.from(String(transformed)));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    const number = Number(chunk.toString());
    const result = number * 10;

    console.log(
      `Processed number: ${number}, Result after multiplication: ${result}`
    );

    callback();
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream()) // Transform the stream to inverse the numbers
  .pipe(new MultiplyByTenStream()); // Pipe the stream to standard output
