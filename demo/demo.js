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

        $('.loadtypes').click(function () {
            $.get("demo/data/catalog.json", function (data, status) {
                let metatypes = $.parseJSON(data);
                let nodes = metatypes.nodes;
                //
                // todo: hasOwnProperty
                //
                for (let nodeKey in metatypes.nodes) {
                    let node = metatypes.nodes[nodeKey];
                    let metatype = {
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
                    let nodeOutputs = node.outputs;
                    for (let noteOutput of nodeOutputs) {
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
                    let nodeProperties = node.schema.properties;
                    for (let nodePropertyKey in nodeProperties) {
                        if (nodeProperties.hasOwnProperty(nodePropertyKey)) {
                            let nodeProperty = nodeProperties[nodePropertyKey];
                            metatype.fields.push(
                                {
                                    "name": nodePropertyKey,
                                    "type": "text",
                                    "card": "1",
                                    "extensible": true,
                                    "defaultValue": "",
                                    "attrs": "editable"
                                }
                            )
                        }
                    }

                    blocks.register(metatype);
                }
            })
        });

        $('.loadgraph').click(function () {
            /*$.get("demo/data/scene.json", function (data, status) {
                blocks.load($.parseJSON(data));
            });
            blocks.perfectScale();*/
            $.get("demo/data/simple_job.json", function (data, status) {
                    let graph = $.parseJSON(data);

                }
            )
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
