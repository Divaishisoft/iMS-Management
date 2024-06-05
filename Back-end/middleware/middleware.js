const Jwt = require("jsonwebtoken")

export const middleWare = (req, res, next) => {
    const authHeader = req.headers["x-authorization"]
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        // req.user_id = id
        const verifyToken = Jwt.verify(token,'%$#@!')
        if(verifyToken){
            next()
            // res.status(200).send("You are not authonticated")
        }else{
            res.status(401).send("You are not authonticated")
        }
    } else {
        res.status(401).send("You are not authonticated")
    }
}
