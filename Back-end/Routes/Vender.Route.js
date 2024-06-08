const express = require("express")
const router = express.Router()


const VenderController = require("../controller/Vender.controll")

router.post("/add-vender",VenderController.venderCreate)
router.get("/getvender",VenderController.getAllVenders)
router.delete("/deleteVender/:id", VenderController.DeleteVender);
// router.get("/getVender/:id", taskController.GetTaskById);   // TODO: will work later both route
// router.put("/editVender/:id", taskController.editTask);
module.exports = router;

