"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


connection.start().then(function () {
   }).catch(function (err) {
    return console.error(err.toString());
});



var chart = new OrgChart(document.getElementById("tree"), {
    nodeBinding: {
        field_0: "name"
    },
    nodeMenu: {
        details: { text: "Details" },
        edit: { text: "Edit" },
        add: { text: "Add" },
        remove: { text: "Remove" }
    }
});



   var nodes = [
        { id: 1, name: "Amber McKenzie" },
        { id: 2, pid: 1, name: "Ava Field" },
        { id: 3, pid: 1, name: "Peter Stevens" }
];

chart.on('add', function (sender, node) {

    var id = node.id.toString();
    var pid = node.pid.toString();
        connection.invoke("SendData", id, pid).catch(function (err) {
            return console.error(err.toString());
        });
    return false;
    });  

connection.on("ReceiveData", function (id, pid) {
    chart.addNode({ id: id, pid: pid });
});

    chart.load(nodes);
