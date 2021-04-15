
const InsuranceModel = require('../models/insurance.model.js');

const HttpException = require('../utils/HttpException.utils.js');
const dotenv = require('dotenv');
dotenv.config();


class InsuraneController {
    getAllInsurances = async (req, res, next) => {
        let InsuranceList = await InsuranceModel.find();
        if (!InsuranceList.length) {
            throw new HttpException(404, 'Orders not found');
        }

        InsuranceList.pop();
        res.send(InsuranceList);
    };
    renderAllInsuranes = async (req, res, next) => {
        let InsuranceList = await InsuranceModel.find();
        if (!InsuranceList.length) {
            throw new HttpException(404, 'Orders not found');
        }


        let jsonedList = JSON.stringify(InsuranceList)
        res.render('index', { message: "Default", description: "this is default page", insurance: jsonedList });
    };

    getCsvJson = async (req, res, next) => {
        let InsuranceList;
        let InsurancePromive = await InsuranceModel.dumb();

        if (!InsurancePromive.length) {
            throw new HttpException(404, 'Orders not found');
        }
        console.log(InsurancePromive)

        res.render('index', { message: "csv reated successfuly", insurance: InsurancePromive })
        // InsuranceList.pop();
        // let jsonedList = JSON.stringify(InsuranceList)
        // res.render('index',{message: "Default", description: "this is default page", insurance: jsonedList});
    };

    setCsvJson = async (req, res, next) => {
         await InsuranceModel.push();
        res.render('index', {message: 'created successfully'})
    }

}


module.exports = new InsuraneController;
