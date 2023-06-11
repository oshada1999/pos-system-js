import {Item} from "../models/Item.js";
import {getAllDB, saveItemDB, updateItemDB, deleteItemDB} from "../db/DB.js";

export class ItemController{
    constructor() {
        $('#saveBtn2').on('click', () => {
            this.handleValidation("Save");
        });
        $('#updateBtn2').on('click', () => {
            this.handleValidation("Update");
        });
        $('#deleteBtn2').on('click', () => {
            this.handleValidation("Delete");
        });
        this.handleLoadItem();
        this.handleTableClickEvent();
    }

    handleValidation(Function) {

        !/^(R)([0-9]{2,})$/.test($('#itemCode').val()) ? alert("Invalid Item code") : !$('#des').val() ? alert("Description is empty !") :
            !/\d+$/.test($('#unitPrice').val()) ? alert("Invalid unit price or empty !") : !/^\d+$/.test($('#qty1').val()) ? alert("Invalid qty or empty !") :
                Function === "Save" ? this.handleSaveItem() : Function === "Update" ? this.handleUpdateItem() :
                    this.handleDeleteItem();
    }

    handleSaveItem(){

        if (this.handleExistingItem()){
            alert("Item code all ready exists !");
            return;
        }
        saveItemDB(new Item($('#itemCode').val(), $('#des').val(), $('#unitPrice').val(), $('#qty1').val()));

        this.handleLoadItem();
    }

    handleUpdateItem(){

        updateItemDB(new Item($('#itemCode').val(), $('#des').val(), $('#unitPrice').val(), $('#qty1').val()));

        this.handleLoadItem();
    }

    handleDeleteItem(){

        deleteItemDB(new Item($('#itemCode').val(), $('#des').val(), $('#unitPrice').val(), $('#qty1').val()));

        this.handleLoadItem();
    }

    handleLoadItem(){

        $('#itemTBl tbody tr td').remove();

        getAllDB("ITEM").map((value) => {
            var row = "<tr>" +
                "<td>" + value._itemCode + "</td>" +
                "<td>" + value._description + "</td>" +
                "<td>" + value._unitPrice + "</td>" +
                "<td>" + value._qtyOnHand + "</td>" +
                "</tr>";

            $('#itemTBl').append(row);
        });

        // disableBtn();
        document.getElementById('saveBtn').disabled = false;
        document.getElementById('updateBtn').disabled = true;
        document.getElementById('deleteBtn').disabled = true;

        //clearData();
        $('#itemCode').val("");
        $('#des').val("");
        $('#unitPrice').val("");
        $('#qty1').val("");
        document.getElementById('itemCode').disabled = false;

    }

    handleExistingItem(){

        let flag = false;
        getAllDB("ITEM").filter((event) => {
            if (event._itemCode === $('#itemCode').val()) {
                flag = true;
            }
        });
        return flag;
    }

    handleTableClickEvent(){

        $('#itemTBl tbody').on('click', 'tr', (event) => {
            $('#itemCode').val($(event.target).closest('tr').find('td').eq(0).text())
            $('#des').val($(event.target).closest('tr').find('td').eq(1).text())
            $('#unitPrice').val($(event.target).closest('tr').find('td').eq(2).text())
            $('#qty1').val($(event.target).closest('tr').find('td').eq(3).text())

            document.getElementById('saveBtn').disabled = true;
            document.getElementById('itemCode').disabled = true;
            document.getElementById('updateBtn').disabled = false;
            document.getElementById('deleteBtn').disabled = false;
        });
    }
}
new ItemController();