(function () {

    blocks = new Blocks();

    blocks.types.addCompatibility('string', 'number');
    blocks.types.addCompatibility('string', 'bool');
    blocks.types.addCompatibility('bool', 'number');
    blocks.types.addCompatibility('bool', 'integer');
    blocks.types.addCompatibility('bool', 'string');

    blocks.run('#blocks');


    blocks.ready(function () {
        blocks.menu.addAction('Export', function (blocks) {
            alert($.toJSON(blocks.export()));
        }, 'export');

        $('.resize').click(function () {
            $('#blocks').width('100%');
            blocks.perfectScale();
        });

        $('.loadcatalog').click(function () {
            $.get("demo/data/testcatalog.json", function (data, status) {
                alert("Data: " + data + "\nStatus: " + status);
                data = $.parseJSON(data);
            })
        });

        $('.loadtypes').click(function () {
            $.get("demo/data/catalog.json", function (data, status) {
                var metatypes = $.parseJSON(data);
                var nodes = metatypes.nodes;
                for (var nodeKey in metatypes.nodes) {
                    let node = metatypes.nodes[nodeKey];
                    var metatype = {
                        "name": nodeKey,
                        "family": node.categoryName,
                        "fields": []
                    };
                    if (node.inputs.length > 0) {
                        metatype.fields.push(
                            {
                                "name": "input",
                                "type": "text",
                                "card": (node.inputs.length > 1) ? "1-*" : "1",
                                "extensible": false,
                                "defaultValue": "_",
                                "attrs": "input"
                            }
                        )
                    }
                    var nodeOutputs = node.outputs;
                    for (var noteOutput of nodeOutputs) {
                        metatype.fields.push(
                            {
                                "name": noteOutput,
                                "type": "text",
                                "card": "1",
                                "extensible": true,
                                "attrs": "output"
                            }
                        )
                    }
                    var nodeProperties = node.schema.properties;
                    for (var nodePropertyKey in nodeProperties) {
                        var nodeProperty = nodeProperties[nodePropertyKey];
                        metatype.fields.push(
                            {
                                "name": nodePropertyKey,
                                "type": "text",
                                "card": "1",
                                "extensible": true,
                                "attrs": "editable"
                            }
                        )
                    }

                    // metatype.fields.push(
                    //     {
                    //         "name": "className",
                    //         "type": "text",
                    //         "card": 1,
                    //         "defaultValue": node.className,
                    //         "extensible": true,
                    //         "attrs": "editable"
                    //     }
                    // );
                    // metatype.fields.push(
                    //     {
                    //         "name": "exposedName",
                    //         "type": "text",
                    //         "card": 1,
                    //         "defaultValue": node.exposedName,
                    //         "extensible": true,
                    //         "attrs": "editable"
                    //     }
                    // );
                    console.log(metatype);
                    blocks.register(metatype);
                }
            })
        });

        $('.loadgraph').click(function () {
            $.get("demo/data/scene.json", function (data, status) {
                blocks.load($.parseJSON(data));
            });
            blocks.run('#blocks');
            blocks.perfectScale();
        });

        $('.savegraph').click(function () {
            alert($.toJSON(blocks.export()));
            /*$.ajax({
                type: "POST",
                url: "http://testrest.local/api",
                // JSON.stringify()
                data: "{}", // document.all.jsontopost.value,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    jsonresponse.innerText = data;
                },
                failure: function (errMsg) {
                    alert(errMsg);
                }
            });*/
        });

    });
})();
