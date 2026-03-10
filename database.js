const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "public ip",
    user: "user",
    password: "password",
    database: "db name",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no banco:", err);
        return;
    }

    console.log("Conectado ao banco de dados!");

    // cria tabela automaticamente se não existir
    const createTable = `
        CREATE TABLE IF NOT EXISTS users (
            id_user INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255),
            email VARCHAR(120)
        )
    `;

    db.query(createTable, (err) => {

        if (err) {
            console.error("Erro ao criar tabela:", err);
            return;
        }

        console.log("Tabela users verificada/criada com sucesso");

    });
});

module.exports = db;