#!/usr/bin/env node
require('dotenv').config();
const fs = require('fs');
const path = require('path');

export default async function run(conn) {

  try {
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));
    files.sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      console.log(`Running migration: ${file}`);
      await conn.query(sql);
    }

    console.log('Migrations completed');
  } catch (err) {
    console.error('Migration failed:', err);
  }
}
