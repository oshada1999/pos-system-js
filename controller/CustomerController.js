import {Customer} from "../models/Customer.js";
import {getAllDB, saveCustomerDB, updateCustomerDB, deleteCustomerDB} from "../db/DB.js";

export class CustomerController {
    constructor() {
        //$('#saveBtn').click(this.handleValidation.bind(this));
        $('#cusSaveBtn').on('click', () => {
            this.handleValidation("Save");
        });
        $('#cusUpdateBtn').on('click', () => {
            this.handleValidation("Update");
        });
        $('#cusDeleteBtn').on('click', () => {
            this.handleValidation("Delete");
        });
        $('#cusSearchBtn').on('click', () => {
            this.handleSearchCustomer();
        });
        $('#cusSearch').on('keyup', () => {
            this.handleSearchCustomer();
        });
        this.handleLReloadCustomerDetails();
        // this.handleSaveCustomer.bind(this);
        this.handleLoadCustomer(getAllDB("DATA"));
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

        this.handleLoadCustomer(getAllDB("DATA"));


    }

    handleUpdateCustomer() {

        updateCustomerDB(new Customer($('#id').val(), $('#name').val(), $('#address').val(), $('#tel').val()));

        this.handleLoadCustomer(getAllDB("DATA"));
    }

    handleDeleteCustomer() {

        deleteCustomerDB(new Customer($('#id').val(), $('#name').val(), $('#address').val(), $('#tel').val()));

        this.handleLoadCustomer(getAllDB("DATA"));
    }

    handleLoadCustomer(array) {


        $('#customerTbl tbody tr td').remove();

        array.map((value) => {
            var row = "<tr>" +
                "<td>" + value._id + "</td>" +
                "<td>" + value._name + "</td>" +
                "<td>" + value._address + "</td>" +
                "<td>" + value._contact + "</td>" +
                "</tr>";

            $('#customerTbl tbody').append(row);
        });

        // disableBtn();
        document.getElementById('cusSaveBtn').disabled = false;
        document.getElementById('cusUpdateBtn').disabled = true;
        document.getElementById('cusDeleteBtn').disabled = true;

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

        $('#customerTbl tbody').on('click', 'tr', (event) => {
            $('#id').val($(event.target).closest('tr').find('td').eq(0).text())
            $('#name').val($(event.target).closest('tr').find('td').eq(1).text())
            $('#address').val($(event.target).closest('tr').find('td').eq(2).text())
            $('#tel').val($(event.target).closest('tr').find('td').eq(3).text())

            document.getElementById('cusSaveBtn').disabled = true;
            document.getElementById('id').disabled = true;
            document.getElementById('cusUpdateBtn').disabled = false;
            document.getElementById('cusDeleteBtn').disabled = false;
        });
    }

    handleSearchCustomer() {

        if (!$('#cusSearch').val()){
            this.handleLoadCustomer(getAllDB("DATA"));
            return;
        }
        let array = [];
        let text = $('#cusSearch').val().toLowerCase();

        getAllDB("DATA").map(value => {

            value._id.toLowerCase().indexOf(text) !== -1 ? array.push(value) :
                value._name.toLowerCase().indexOf(text) !== -1 ? array.push(value) :
                    value._address.toLowerCase().indexOf(text) !== -1 ? array.push(value) :
                        value._contact.toLowerCase().indexOf(text) !== -1 ? array.push(value) :
                            undefined;
        });
        if (array) this.handleLoadCustomer(array);
    }

    handleLReloadCustomerDetails() {

        $(document).on('click', (event) => {
            if (event.target.className === 'form-control me-2 was-validated search')
                setTimeout(() => {
                    if (!$('#cusSearch').val()) this.handleLoadCustomer(getAllDB("DATA"));
                });
        });
    }
}

new CustomerController();