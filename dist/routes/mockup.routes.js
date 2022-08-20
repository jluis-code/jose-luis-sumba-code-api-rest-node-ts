"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mockup_controller_1 = require("../controller/mockup.controller");
const router = (0, express_1.Router)();
router.get('/', mockup_controller_1.getVerificationCodes);
exports.default = router;
//# sourceMappingURL=mockup.routes.js.map