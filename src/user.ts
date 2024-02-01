import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import express, { Request, Response } from 'express';
import { string } from 'mathjs';

const router = express.Router();


//GET
router.get('/user', async (req: Request, res: Response) => {
    try {
        let users = await prisma.user.findMany();
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
})

//POST
router.post('/addUser', async (req: Request, res: Response) => {
    console.log(req);
    try {
        let name: string = req.body.name;
        let age: number = req.body.age;
        let role = req.body.role;
        let email: string = req.body.email;

        let user = await prisma.user.create({
            data: {
                name: name,
                age: age,
                role: role,
                email: email
            }
        })
        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error");
    }
})
export = router;

//PUT
router.put('/updateUser/userID', async (req: Request, res: Response) => {
    const userID: string = req.params.userID; 
    console.log(req);
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userID
            }
        })

        if (!existingUser) {
            return res.status(404).send("user not found");
        }

        const { name, age, role, email } = req.body;

        const updatedUser = await prisma.user.update({
            where: {
                id: userID
            },
            data: {
                name: name,
                age: age,
                role: role,
                email: email
            },
        })
        res.send(updatedUser);
    } catch(error) {
        console.log(error);
        res.status(500).send("Internal Server error");
    }
})

//DELETE
router.delete('/deleteUser/userID', async (req: Request, res: Response) => {
    const userID: string = req.params.userID; //we are using uuid

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userID
            }
        })

        if (!existingUser) {
            return res.status(404).send("user not found");
        }

        await prisma.user.delete({
            where: {
                id: userID
            }
        })
        res.send("User deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error")
    }
})
