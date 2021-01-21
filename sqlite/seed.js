import connect, { sql } from "@databases/expo";
import agriculturalEconomicsArray from "../data/agriculturalEconomicsArray";
import agriculturalExtensionArray from "../data/agriculturalExtensionArray";
import animalScienceArray from "../data/animalScienceArray";
import cropProtectionArray from "../data/cropProtectionArray";
import cropScienceArray from "../data/cropScienceArray";
import soilScienceArray from "../data/soilScienceArray";

const db = connect("iagri");

const ready = db.tx(function* (tx) {
  yield tx.query(sql`
      CREATE TABLE IF NOT EXISTS schema_version (
        version INT NOT NULL
      );
    `);
  const versionRecord = yield tx.query(sql`
      SELECT version FROM schema_version;
    `);
  const version = versionRecord.length ? versionRecord[0].version : 0;
  if (version < 1) {
    yield tx.query(sql`
            CREATE TABLE IF NOT EXISTS agriculturaleconomics (
              id TEXT NOT NULL,
              question TEXT NOT NULL,
              a TEXT NOT NULL,
              b TEXT NOT NULL,
              c TEXT NOT NULL,
              d TEXT NOT NULL,
              answer TEXT NOT NULL
            );
          `);

    yield tx.query(sql`
        CREATE TABLE IF NOT EXISTS agriculturalextension (
            id TEXT NOT NULL,
            question TEXT NOT NULL,
            a TEXT NOT NULL,
            b TEXT NOT NULL,
            c TEXT NOT NULL,
            d TEXT NOT NULL,
            answer TEXT NOT NULL
          );
        `);

    yield tx.query(sql`
        CREATE TABLE IF NOT EXISTS animalscience (
          id TEXT NOT NULL,
          question TEXT NOT NULL,
          a TEXT NOT NULL,
          b TEXT NOT NULL,
          c TEXT NOT NULL,
          d TEXT NOT NULL,
          answer TEXT NOT NULL
        );
      `);

    yield tx.query(sql`
        CREATE TABLE IF NOT EXISTS cropprotection (
        id TEXT NOT NULL,
        question TEXT NOT NULL,
        a TEXT NOT NULL,
        b TEXT NOT NULL,
        c TEXT NOT NULL,
        d TEXT NOT NULL,
        answer TEXT NOT NULL
      );
    `);

    yield tx.query(sql`
        CREATE TABLE IF NOT EXISTS soilscience (
      id TEXT NOT NULL,
      question TEXT NOT NULL,
      a TEXT NOT NULL,
      b TEXT NOT NULL,
      c TEXT NOT NULL,
      d TEXT NOT NULL,
      answer TEXT NOT NULL
    );
    `);

    yield tx.query(sql`
        CREATE TABLE IF NOT EXISTS cropscience (
      id TEXT NOT NULL,
      question TEXT NOT NULL,
      a TEXT NOT NULL,
      b TEXT NOT NULL,
      c TEXT NOT NULL,
      d TEXT NOT NULL,
      answer TEXT NOT NULL
    );
    `);

    agriculturalEconomicsArray.map((data) => {
      return function* () {
        yield db.query(sql`
        INSERT INTO agriculturaleconomics (id, question, a, b, c, d, answer)
        VALUES (${data.id}, ${data.question}, ${data.a}, ${data.b}, ${data.c}, ${data.d}, ${data.answer});
     `);
      };
    });

    agriculturalExtensionArray.map((data) => {
      return function* () {
        yield db.query(sql`
      INSERT INTO agriculturalextension (id, question, a, b, c, d, answer)
      VALUES (${data.id}, ${data.question}, ${data.a}, ${data.b}, ${data.c}, ${data.d}, ${data.answer});
    `);
      };
    });

    animalScienceArray.map((data) => {
      return function* () {
        yield db.query(sql`
      INSERT INTO animalscience (id, question, a, b, c, d, answer)
      VALUES (${data.id}, ${data.question}, ${data.a}, ${data.b}, ${data.c}, ${data.d}, ${data.answer});
    `);
      };
    });

    cropProtectionArray.map((data) => {
      return function* () {
        yield db.query(sql`
      INSERT INTO cropprotection (id, question, a, b, c, d, answer)
      VALUES (${data.id}, ${data.question}, ${data.a}, ${data.b}, ${data.c}, ${data.d}, ${data.answer});
    `);
      };
    });

    cropScienceArray.map((data) => {
      return function* () {
        yield db.query(sql`
      INSERT INTO cropscience (id, question, a, b, c, d, answer)
      VALUES (${data.id}, ${data.question}, ${data.a}, ${data.b}, ${data.c}, ${data.d}, ${data.answer});
    `);
      };
    });

    soilScienceArray.map((data) => {
      return function* () {
        yield db.query(sql`
      INSERT INTO soilscience (id, question, a, b, c, d, answer)
      VALUES (${data.id}, ${data.question}, ${data.a}, ${data.b}, ${data.c}, ${data.d}, ${data.answer});
    `);
      };
    });
  }
  // to add other versions in the future,
  // we can just add extra if statements
  // and increase LATEST_VERSION
  const LATEST_VERSION = 1;
  if (version === 0) {
    yield tx.query(sql`
        INSERT INTO schema_version
        VALUES (${LATEST_VERSION});
      `);
  } else {
    yield tx.query(sql`
        UPDATE schema_version
        SET version = ${LATEST_VERSION};
      `);
  }
});

export default ready;
