import { calculation } from "../Models/calculation";
export class api {
    static async sendCalculationToAPI(weight: number, carbDose: number, userID: number): Promise < boolean > {
        const date = new Date().toLocaleString();
        const json = JSON.stringify({"weight":weight,"carbDose":carbDose,"calculationDateTime":date, "user": {"id": userID }});

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("timeout", "5000");

        const response = await fetch("http://localhost:8000/api/postcalculation", {
            method: 'POST',
            headers: myHeaders,
            body: json,
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    }

    static async getCalculationFromApi(): Promise<Array<calculation>>{
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Connection", "keep-alive");
        myHeaders.append("timeout", "5000");

        const response = await fetch("http://localhost:8000/api/getcalculation", {
           method: 'GET',
           headers: myHeaders,
        });

        const data = await response.json().catch(error => console.log(error));
        console.log(data);
        return data;
    }
}