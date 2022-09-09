const db = require( '../db' );

class UserController {
    async createUser( req, res ) {
        const { name, email } = req.body;
        const result = await db.query( 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email] );
        res.status( 200 ).json( result.rows[0] );
    }
    async getAllUsers( req, res ) {
        console.log( req.path );
        try {
            const users = await db.query( 'SELECT * FROM users' );
            res.status( 200 ).json( users.rows );
        }
        catch ( error ) {
            res.status( 500 ).json( { error: error } );
        }
    }
    async getUser( req, res ) {
        const id = req.params.id;
        const result = await db.query( 'SELECT * FROM users WHERE id = $1', [id] );
        res.status( 200 ).json( result.rows[0] );
    }
    async updateUser( req, res ) {
        const { id, name, email } = req.body;
        const result = db.query(
            'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
            [name, email, id]
        );
        res.status( 200 ).json( ( await result ).rows[0] );
    }
    async deleteUser( req, res ) {
        const id = req.params.id;
        const result = await db.query( 'DELETE FROM users WHERE id = $1', [id] );
        res.status( 200 ).json( result.rows[0] );
    }
}

module.exports = new UserController();