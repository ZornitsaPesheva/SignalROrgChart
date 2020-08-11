"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


connection.start().then(function () {
   }).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveData", function (id, pid) {
    chart.addNode({ id: id, pid: pid });
});

var chart = new OrgChart(document.getElementById("tree"), {
    nodeBinding: {
        field_0: "name"
    },
    nodeMenu: {
        add: { text: "Add" }
    }
});

var nodes = [
    { id: "1", name: "Amber McKenzie" },
    { id: "2", pid: "1", name: "Ava Field" },
    { id: "3", pid: "1", name: "Peter Stevens" }
];

chart.on('add', function (sender, node) {
    connection.invoke("SendData", node.id, node.pid).catch(function (err) {
            return console.error(err.toString());
    });
    return false;
});  

chart.load(nodes);
