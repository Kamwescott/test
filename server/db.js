import pg from "pg"

const {Pool} = pg
const pool = new Pool({
    cconnectionString: "process.env.DATABASE_URL",
    database:"mvp"
})

export default pool