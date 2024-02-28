import { LightningElement, wire, track } from 'lwc';
import  GetAllContacts  from "@salesforce/apex/ContactsHandler.GetAllContacts"
import  GetContactById  from "@salesforce/apex/ContactsHandler.GetContactById"
import  GetAllEmailTemplates  from "@salesforce/apex/EmailsHandler.GetAllEmailTemplates"
import  GetEmailTemplateById  from "@salesforce/apex/EmailsHandler.GetEmailTemplateById"
import SendEmail from "@salesforce/apex/SendEmailHandler.SendEmail"

export default class ContactsList extends LightningElement {
    contacts
    options

    emails
    emailOptions


    @track selectedContactId;
    @track selectedEmailId;

    @wire(GetAllContacts)
    wiredContacts({error, data}) {
        if (data) {
            this.contacts = data;
            this.options = this.getFormattedItems(this.contacts)
        }
        else if (error) {
            console.log(error);
        }
    }

    @wire(GetAllEmailTemplates)
    wirdedEmails({error, data}) {
        if (data) {
            this.emails = data;
            this.emailOptions = this.getFormattedItems(this.emails)
        }
        else if (error) {
            console.log(error);
        }
    }

    handleContactChange(event) {
        this.selectedContactId = event.detail.value;
        console.log(this.selectedContactId);
        // // Dispatch an event with selected contact Id
        // const contactSelected = new CustomEvent('contactselected', {
        //     detail: { contactId: this.selectedContactId }
        // });
        // this.dispatchEvent(contactSelected);
    }

    handleEmailChange(event) {
        this.selectedEmailId = event.detail.value;
    }

    getFormattedItems(items) {
        return items.map(item => {
            return {
                label: item.Name,
                value: item.Id
            };
        });
    }

    onSendMail() {
        var sendTo = this.contacts.find(c => c.Id === this.selectedContactId)?.Email || "";
        var content = this.emails.find(e => e.Id === this.selectedEmailId)?.Name || "";

        SendEmail({ content, sendTo })
        .then(result => {
            if (result) {
                // Email sent successfully
                console.log('Email sent successfully.');
            } else {
                // Failed to send email
                console.error('Failed to send email.');
            }
        })
        .catch(error => {
            // Log any errors
            console.error('Error occurred while sending email:', error);
        });
    }
}