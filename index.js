const express = require("express");
const cors = require("cors");
const db = require("./database.js");

const app = express();

app.use(express.json());
app.use(cors());

// CREATE
app.post("/users", (req, res) => {

    const { name, username, password, email } = req.body;

    db.query(
        "INSERT INTO users (name, username, password, email) VALUES (?, ?, ?, ?)",
        [name, username, password, email],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                id_user: result.insertId,
                name,
                username,
                email
            });

        }
    );

});

// READ ALL
app.get("/users", (req, res) => {

    db.query("SELECT * FROM users", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});


// READ BY ID
app.get("/users/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result[0]);

        }
    );

});


// UPDATE
app.put("/users/:id", (req, res) => {

    const id = req.params.id;
    const { name, username, password, email } = req.body;

    if (password) {

        db.query(
            "UPDATE users SET name=?, username=?, password=?, email=? WHERE id_user=?",
            [name, username, password, email, id],
            (err, result) => {

                if (err) return res.status(500).json(err);

                res.json({ updated: result.affectedRows });

            }
        );

    } else {

        db.query(
            "UPDATE users SET name=?, username=?, email=? WHERE id_user=?",
            [name, username, email, id],
            (err, result) => {

                if (err) return res.status(500).json(err);

                res.json({ updated: result.affectedRows });

            }
        );

    }

});


// DELETE
app.delete("/users/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM users WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                deleted: result.affectedRows
            });

        }
    );

});


// servidor
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});