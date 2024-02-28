import { LightningElement, wire } from 'lwc';
import  GetCases  from "@salesforce/apex/CaseHandler.GetCases"

export default class HelloLWC extends LightningElement {

    cases 
    


    @wire(GetCases)
    wiredCases({error, data}) {
        if (data) {
            console.log(data);
            this.cases = JSON.stringify(data)
        }
        else if (error) {
            console.log(error);
        }

    }

    connectedCallback() {
        console.log("Hello World");
    }
}
