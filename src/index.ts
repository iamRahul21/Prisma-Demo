import express, {Request, Response} from 'express';
import user from './user';

const app = express();

app.use(express.json());
app.use("/user", user);

app.get("/user", (req: Request, res: Response) => {
    console.log("You have used / path")
    res.send("Hello World")
})

const PORT = 3000
app.listen(PORT, ()=>{
    console.log("your server is running at http://localhost:3000")
})