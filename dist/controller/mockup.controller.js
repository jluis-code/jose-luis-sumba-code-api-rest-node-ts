"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerificationCodes = void 0;
const getVerificationCodes = (req, res) => {
    const repositories = [
        {
            id: 1,
            state: 604,
        },
        {
            id: 2,
            state: 605,
        },
        {
            id: 3,
            state: 606,
        }
    ];
    res.json({
        repositories
    });
};
exports.getVerificationCodes = getVerificationCodes;
//# sourceMappingURL=mockup.controller.js.map