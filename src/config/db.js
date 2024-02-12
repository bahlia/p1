const { Pool } = require('pg');

class Database {
    constructor() {
        this.pool = new Pool({
          user: 'postgres',
          host: 'localhost',
          database: 'prueba',
          password: '12345678',
          port: 5432, 
        });
    }

    async query(text, params) {
        const start = Date.now();
        const res = await this.pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query:', { text, duration, rows: res.rowCount });
        return res;
    }

    async getAll(tableName) {
        const query = `SELECT * FROM ${tableName};`;
        const result = await this.query(query);
        return result.rows;
    }

    async getById(tableName, id) {
        const query = `SELECT * FROM ${tableName} WHERE id = $1;`;
        const result = await this.query(query, [id]);
        return result.rows[0];
    }

    async search(tableName, conditions) {
        const keys = Object.keys(conditions);
        const values = Object.values(conditions);
        let whereClause = '';
        keys.forEach((key, index) => {
            whereClause += `"${key}" = '${values[index]}'`;
            if (index < keys.length - 1) {
                whereClause += ' AND ';
            }
        });
        const query = `SELECT * FROM ${tableName} WHERE ${whereClause};`;
        const result = await this.query(query);
        return result.rows;
    }

    async create(tableName, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map((key, index) => `$${index + 1}`).join(',');
        const query = `INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${placeholders}) RETURNING *;`;
        const result = await this.query(query, values);
        return result.rows[0];
    }

    async update(tableName, id, data) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        let setClause = '';
        keys.forEach((key, index) => {
            setClause += `"${key}" = '${values[index]}'`;
            if (index < keys.length - 1) {
                setClause += ', ';
            }
        });
        const query = `UPDATE ${tableName} SET ${setClause} WHERE id = '${id}' RETURNING *;`;
        const result = await this.query(query);
        return result.rows[0];
    }

    async delete(tableName, id) {
        const query = `DELETE FROM ${tableName} WHERE id = $1;`;
        await this.query(query, [id]);
        return { success: true };
    }

    async join(table1, table2, joinCondition) {
        const query = `SELECT * FROM ${table1} INNER JOIN ${table2} ON ${joinCondition};`;
        const result = await this.query(query);
        return result.rows;
    }
}

module.exports = Database;