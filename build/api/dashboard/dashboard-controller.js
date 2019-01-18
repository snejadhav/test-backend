"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uphold_sdk_javascript_1 = require("@uphold/uphold-sdk-javascript");
class DashboardController {
    async getDashboard(request, h) {
        const db = request.getDb();
        const userModel = db.getModel('User');
        // const companyModel = db.getModel('Company');
        // const payrollModel = db.getModel('Payroll');
        // const empModel = db.getModel('Employee');
        let dashboardData = {
            // employeeOverview: null,
            // reminders: null,
            // companyOverview: null,
            // payrollOverview: null,
            assetCards: [],
            userName: null,
            totalAssets: null
        };
        let user = await userModel.findOne({ where: {
                User_id: request.payload.user
            } }).then(user => {
            dashboardData.userName = user.dataValues.Name;
            return user;
        });
        // let company = null;
        //
        // if (isNumber(user.dataValues.Company_id)) {
        //     company = await companyModel.findOne({
        //         where: {
        //             Company_id: user.dataValues.Company_id
        //         }
        //     });
        //
        //     dashboardData.companyOverview = {
        //         companyName: company.dataValues.Name,
        //         address: company.dataValues.Address,
        //         empNo: null
        //     };
        //
        //     let payroll = await payrollModel.findOne({
        //         where: {
        //             Company_id: user.dataValues.Company_id
        //         }
        //     });
        //     if (payroll) {
        //         dashboardData.payrollOverview = {
        //             empNo: null,
        //             monthTotal: payroll.dataValues.Total_amt,
        //             yearTotal: null
        //         };
        //     }
        //
        //     let employees = await empModel.findAndCountAll({
        //         where: {
        //             Company_id: user.Company_id
        //         }
        //     }).then(employees => {
        //         return employees;
        //     });
        //
        //     dashboardData.companyOverview.empNo = employees.count;
        //
        //     let overviewEmpLimit = 3;
        //     let overviewEmpProcessed = 0;
        //     dashboardData.employeeOverview = [];
        //
        //     for (let employee of employees.rows) {
        //         if (overviewEmpProcessed < overviewEmpLimit) {
        //             overviewEmpProcessed++;
        //         } else {
        //             break;
        //         }
        //         let empName = employee.dataValues.Name.toString();
        //         let empObj = {
        //             name: empName,
        //             designation: employee.dataValues.Designation,
        //             payAmt: employee.dataValues.Payroll_amt
        //         };
        //         dashboardData.employeeOverview.push(empObj);
        //     }
        //
        // }
        const clientId = "92b60dcae7c59ee80254ebe10f6aa959f4aa128f"; // Config.get('/upholdClientId');
        const clientSecret = "65164feb2c793b3d0409e0847685c3647f96b8e2"; // Config.get('/upholdClientSecret');
        const sdk = new uphold_sdk_javascript_1.default({
            baseUrl: 'https://api-sandbox.uphold.com',
            clientId: clientId,
            clientSecret: clientSecret
        });
        sdk.setToken({
            access_token: user.dataValues.Access_token,
            refresh_token: user.dataValues.Refresh_token
        });
        let upholdCards = await sdk.getCards().then(paginatorObj => {
            return paginatorObj.items;
        });
        for (let card of upholdCards) {
            let cardObj = {
                label: card.label,
                currency: card.currency,
                amt: card.balance
            };
            dashboardData.assetCards.push(cardObj);
        }
        let upholdDetails = await sdk.getMe();
        dashboardData.totalAssets = upholdDetails.balances.total;
        console.log(dashboardData);
        return h.response(dashboardData);
    }
}
exports.default = DashboardController;
