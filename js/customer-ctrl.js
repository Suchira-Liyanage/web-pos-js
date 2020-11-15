/*
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *                     Version 2, December 2004
 *
 *  Copyright (C) 2020 IJSE
 *
 *  Everyone is permitted to copy and distribute verbatim or modified
 *  copies of this license document, and changing it is allowed as long
 *  as the name is changed.
 *
 *             DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
 *    TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
 *
 *   0. You just DO WHAT THE FUCK YOU WANT TO.
 */

/**
 * @author : Ranjith Suranga <suranga@ijse.lk>
 * @since : 11/15/20
 **/

/*===============================================================================
 * Global Variables
 *===============================================================================*/

// Todo: add all global variable declaration here

var btnSave = document.getElementById('btn-save');
var customerTable = document.querySelector('#tbl-customers');
var tableBody = document.getElementById('tableBody');

/*===============================================================================
 * Init
 *===============================================================================*/

init();

function init(){
    // Todo: add the initialization code if any
}

/*===============================================================================
 * Event Handlers and Timers
 *===============================================================================*/

// Todo: add all event listeners and handlers here

btnSave.addEventListener('click',function (){
    var customerID = document.getElementById('txt-id').value;
    var customerName = document.getElementById('txt-name').value;
    var customerAddress = document.getElementById('txt-address').value;
    var customer = new CreateCustomer(customerID, customerName, customerAddress);
    addTable(customer);
});

customerTable.addEventListener('mouseover',function (event){
    if (event.target.className === 'deleteIcon'){
        event.target.setAttribute('src','./img/trash-hover.png');
        event.target.addEventListener('mouseout',function (){
            event.target.setAttribute('src','./img/trash.png');
        })
    }
});

customerTable.addEventListener('click',function (event){
    var rowIndex = event.target.closest("tr").rowIndex;
    if (event.target.className === 'deleteIcon'){
        Swal.fire({
            title: 'Are you sure whether you want to delete this customer?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                customerTable.deleteRow(rowIndex);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }
});

tableBody.addEventListener('mousedown',function (event){
    var rows = tableBody.rows;
    for (var i = 0; i < rows.length; i++) {
        rows[i].className = '';
    }
    var selectedRow = event.target.closest("tr");
    selectedRow.className = 'table-dark';
});

setInterval(function (){
    if (customerTable.rows.length > 2){
        customerTable.deleteTFoot();
    }else if (customerTable.rows.length < 2){
        var tfoot = customerTable.createTFoot();
        tfoot.innerHTML = '<tr>\n' +
            '                    <td class="text-center" colspan="4">\n' +
            '                        📌 <small>There are no records to show. Add a new customer.</small>\n' +
            '                    </td>\n' +
            '                </tr>'
    }
},100);

/*===============================================================================
 * Functions
 *===============================================================================*/

// Todo: add all functions

function CreateCustomer(id, name, address){
    this.id = id;
    this.name = name;
    this.address = address;
}

function addTable(customer){
    var tableBody = document.getElementById('tableBody');

    var image = document.createElement('img');
    image.setAttribute('src','./img/trash.png');
    image.className = 'deleteIcon';
    image.style.width = '32px';
    image.style.height = '32px';

    var newRow = tableBody.insertRow(-1);
    var cusID = newRow.insertCell(0);
    var cusName = newRow.insertCell(1);
    var cusAddress = newRow.insertCell(2);
    var cusDelete = newRow.insertCell(3);
    cusID.innerText = customer.id;
    cusID.style.textAlign = 'center';
    cusName.innerText = customer.name;
    cusAddress.innerText = customer.address;
    cusDelete.append(image);
    cusDelete.style.textAlign = 'center';

}