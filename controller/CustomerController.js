import {Customer} from "../models/Customer.js";
import {getAllDB, saveCustomerDB, updateCustomerDB, deleteCustomerDB} from "../db/DB.js";

export class CustomerController {
    constructor() {
        //$('#saveBtn').click(this.handleValidation.bind(this));
        $('#saveBtn').on('click', () => {
            this.handleValidation("Save");
        });
        $('#updateBtn').on('click', () => {
            this.handleValidation("Update");
        });
        $('#deleteBtn').on('click', () => {
            this.handleValidation("Delete");
        });
        // this.handleSaveCustomer.bind(this);
        this.handleLoadCustomer();
        this.handleTableClickEvent();
    }

    handleValidation(Function) {

        !/^(C)([0-9]{2,})$/.test($('#id').val()) ? alert("Invalid ID") : !$('#name').val() ? alert("Invalid name") :
            !$('#address').val() ? alert("Invalid address") : !/^(075|077|071|074|078|076|070|072)([0-9]{7})$/.test($('#tel').val()) ? alert("Invalid Tele") :
                Function === "Save" ? this.handleSaveCustomer() : Function === "Update" ? this.handleUpdateCustomer() :
                    this.handleDeleteCustomer();
    }

    handleSaveCustomer() {

        if (this.handleExistsCustomer()) {
            alert("Customer ID all ready exists !");
            return;
        }
        saveCustomerDB(new Customer($('#id').val(), $('#name').val(), $('#address').val(), $('#tel').val()));

        this.handleLoadCustomer();


    }

    handleUpdateCustomer() {

        updateCustomerDB(new Customer($('#id').val(), $('#name').val(), $('#address').val(), $('#tel').val()));

        this.handleLoadCustomer();
    }

    handleDeleteCustomer() {

        deleteCustomerDB(new Customer($('#id').val(), $('#name').val(), $('#address').val(), $('#tel').val()));

        this.handleLoadCustomer();
    }

    handleLoadCustomer() {

        $('#custtable tbody tr td').remove();

        getAllDB("DATA").map((value) => {
            var row = "<tr>" +
                "<td>" + value._id + "</td>" +
                "<td>" + value._name + "</td>" +
                "<td>" + value._address + "</td>" +
                "<td>" + value._contact + "</td>" +
                "</tr>";

            $('#custtable').append(row);
        });

        // disableBtn();
        document.getElementById('saveBtn').disabled = false;
        document.getElementById('updateBtn').disabled = true;
        document.getElementById('deleteBtn').disabled = true;

        //clearData();
        $('#id').val("");
        $('#name').val("");
        $('#address').val("");
        $('#tel').val("");
        document.getElementById('id').disabled = false;
    }

    handleExistsCustomer() {

        let flag = false;
        getAllDB("DATA").filter((event) => {
            if (event._id === $('#id').val()) {
                flag = true;
            }
        });
        return flag;
    }

    handleTableClickEvent() {

        $('table tbody').on('click', 'tr', (event) => {
            $('#id').val($(event.target).closest('tr').find('td').eq(0).text())
            $('#name').val($(event.target).closest('tr').find('td').eq(1).text())
            $('#address').val($(event.target).closest('tr').find('td').eq(2).text())
            $('#tel').val($(event.target).closest('tr').find('td').eq(3).text())

            document.getElementById('saveBtn').disabled = true;
            document.getElementById('id').disabled = true;
            document.getElementById('updateBtn').disabled = false;
            document.getElementById('deleteBtn').disabled = false;
        });
    }
}
new CustomerController();