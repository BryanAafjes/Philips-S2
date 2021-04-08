var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { CalculateBolus } from "../Controllers/boluscalculation.js";
import { api } from "../Controllers/apiController.js";
function UpdateFrontendBolusList() {
    var _this = this;
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var x, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.getCalculationFromApi()];
                case 1:
                    x = _a.sent();
                    Promise.resolve(x);
                    console.log(x[0].carbs);
                    document.getElementById("boluslist").innerHTML = "";
                    i = 0;
                    x.forEach(function (value) {
                        //console.log(x[i].weight);
                        var date = new Date(x[i].calculationTime).toLocaleString();
                        //console.log(date);
                        document.getElementById("boluslist").insertAdjacentHTML("beforeend", "id: " + x[i].id + " Weight: " + x[i].weight + " carbdose: " + x[i].carbs + " calculationtime: " + date + "<br>" + "<br>");
                        i++;
                    });
                    return [2 /*return*/];
            }
        });
    }); })();
}
//event listener
window.addEventListener("load", function () {
    var buttonWeight = document.getElementById("buttonWeight");
    var outputDailyDose;
    var weightAPI;
    var buttonWeight2 = document.getElementById("buttonCalculationList");
    if (buttonWeight2) {
        document
            .getElementById("buttonCalculationList")
            .addEventListener("click", function () {
            alert("floober");
            UpdateFrontendBolusList();
        });
    }
    if (buttonWeight) {
        document
            .getElementById("buttonWeight")
            .addEventListener("click", function () {
            var weight = (document.getElementById("userWeight")).value;
            weightAPI = weight;
            if (weight.match(/^[0-9]+$/)) {
                if (weight) {
                    outputDailyDose = Math.round(CalculateBolus.calculateDailyDose(parseFloat(weight)));
                    //check for error
                    if (outputDailyDose == 0) {
                        alert("ERROR: Weight must be between 1 and 430 kilograms!");
                    }
                    else {
                        var outputBaselDose = Math.round(CalculateBolus.calculateBasalDose(outputDailyDose));
                        if (outputBaselDose !== 0) {
                            document.getElementById("dailyDoseNumber").innerHTML =
                                outputDailyDose.toString() + " Units";
                            document.getElementById("basalDoseNumber").innerHTML =
                                outputBaselDose.toString() + " Units";
                            alert("test");
                        }
                    }
                }
                else {
                    alert("ERROR: Enter a Value!");
                }
            }
            else {
                alert("ERROR: Only enter positive numbers!");
            }
        });
    }
    var buttonCarbs = document.getElementById("buttonWeight");
    if (buttonCarbs) {
        document
            .getElementById("buttonCarbs")
            .addEventListener("click", function () {
            if (outputDailyDose) {
                var carbsWeight = (document.getElementById("userCarbs")).value;
                api.sendCalculationToAPI(weightAPI, parseFloat(carbsWeight));
                if (carbsWeight.match(/^[0-9]+$/)) {
                    if (carbsWeight) {
                        var output = Math.round(CalculateBolus.calculateIntakeMeal(outputDailyDose, parseFloat(carbsWeight)));
                        if (output == 0) {
                            alert("ERROR: Amount of Carbs must be between 1 and 300 grams!");
                        }
                        else {
                            document.getElementById("carbsDoseNumber").innerHTML =
                                output.toString() + " Units";
                        }
                    }
                    else {
                        alert("ERROR: Enter a Value!");
                    }
                }
                else {
                    alert("ERROR: Only enter positive numbers!");
                }
            }
            else {
                alert("ERROR: Enter bodyweight!");
            }
        });
    }
}, false);