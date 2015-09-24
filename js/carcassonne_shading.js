var baseImageColors = {
	detailLineColor : "#0000ff",
	grass 			: [160,160,160],
	roadAndBuilding : [255,255,255],
	roofs 			: [234,234,234],
	castleSoil 		: [120,120,120],
	shrub 			: [25,25,25]
};

var colorSettings = {
	detailLineColor : "#0000ff",
	grass 			: [160,160,160],
	roadAndBuilding : [255,255,255],
	roofs 			: [234,234,234],
	castleSoil 		: [120,120,120],
	shrub 			: [25,25,25]
};


function updateColors(elementToUpdate){
	elementToUpdate.find("svg").find("path").css({stroke:colorSettings.detailLineColor});
	elementToUpdate.find("svg").find("image").each(function(index){
		var image = new Image();
		image.src = $(this).attr("xlink:href");
		var canvas = convertImageToCanvas(image);
		var canvasContext = canvas.getContext("2d");

        var imageData = canvasContext.getImageData(0, 0, image.width, image.height);
        var data = imageData.data;
        // += 4 since this is RGBA
        for(var i = 0; i < data.length; i += 4) {
            var newColors = recolor( [data[i], data[i+1], data[i+2]] );
            // red
            data[i] = newColors[0];
            // green
            data[i + 1] = newColors[1];
            // blue
            data[i + 2] = newColors[2];
            // opacity
            data[i + 3] = 255;
        }
        canvasContext.putImageData(imageData, 0, 0);
        $(this).attr("xlink:href", convertCanvasToImage(canvas).src);
	});
};
	
function recolor(colorTuple){
	var colorTupleToSet = colorTuple;

	if (colorTuple[0] == baseImageColors.castleSoil[0] && 
		colorTuple[1] == baseImageColors.castleSoil[1] &&
		colorTuple[2] == baseImageColors.castleSoil[2]){
		colorTupleToSet = colorSettings.castleSoil;
	}

	if (colorTuple[0] == baseImageColors.grass[0] && 
		colorTuple[1] == baseImageColors.grass[1] &&
		colorTuple[2] == baseImageColors.grass[2]){
		colorTupleToSet = colorSettings.grass;
	}

	if (colorTuple[0] == baseImageColors.roadAndBuilding[0] && 
		colorTuple[1] == baseImageColors.roadAndBuilding[1] &&
		colorTuple[2] == baseImageColors.roadAndBuilding[2]){
		colorTupleToSet = colorSettings.roadAndBuilding;
	}

	if (colorTuple[0] == baseImageColors.roofs[0] && 
		colorTuple[1] == baseImageColors.roofs[1] &&
		colorTuple[2] == baseImageColors.roofs[2]){
		colorTupleToSet = colorSettings.roofs;
	}

	if (colorTuple[0] == baseImageColors.shrub[0] && 
		colorTuple[1] == baseImageColors.shrub[1] &&
		colorTuple[2] == baseImageColors.shrub[2]){
		colorTupleToSet = colorSettings.shrub;
	}

	return colorTupleToSet;
}

$(document).ready(function(){
	loadSampleTile();

	$('#grassColorpicker').colorpicker({"format":"rgb", "color": "rgb(" + baseImageColors.grass.toString() + ")"}).on('changeColor', function(ev){
		var c = ev.color.toRGB();
		colorSettings.grass = [c.r, c.g, c.b];
	  	loadSampleTile();
	});
	$('#roadAndBuildingColorpicker').colorpicker({"format":"rgb", "color": "rgb(" + baseImageColors.roadAndBuilding.toString() + ")"}).on('changeColor', function(ev){
		var c = ev.color.toRGB();
		colorSettings.roadAndBuilding = [c.r, c.g, c.b];
	  	loadSampleTile();
	});
	$('#roofsColorpicker').colorpicker({"format":"rgb", "color": "rgb(" + baseImageColors.roofs.toString() + ")"}).on('changeColor', function(ev){
		var c = ev.color.toRGB();
		colorSettings.roofs = [c.r, c.g, c.b];
	  	loadSampleTile();
	});
	$('#castleSoilColorpicker').colorpicker({"format":"rgb", "color": "rgb(" + baseImageColors.castleSoil.toString() + ")"}).on('changeColor', function(ev){
		var c = ev.color.toRGB();
		colorSettings.castleSoil = [c.r, c.g, c.b];
	  	loadSampleTile();
	});
	$('#shrubColorpicker').colorpicker({"format":"rgb", "color": "rgb(" + baseImageColors.shrub.toString() + ")"}).on('changeColor', function(ev){
		var c = ev.color.toRGB();
		colorSettings.shrub = [c.r, c.g, c.b];
	  	loadSampleTile();
	});

	$('#edgesColorpicker').colorpicker({"format":"rgb", "color": "rgb(" + baseImageColors.detailLineColor.toString() + ")"}).on('changeColor', function(ev){
		var c = ev.color.toHex();
		colorSettings.detailLineColor = c;
	  	loadSampleTile();
	});

	$("#saveSVGButton").on("click", function(e){
		e.preventDefault();

		$('#wait-modal').modal({show:true, keyboard:false, backdrop:"static"});
		$(".tile-panel").show();

		setTimeout( function(){
			var panel1 = new $.Deferred();
			$("#panel-1").load("./panel_1.svg", function(){
				updateColors($(this));
				panel1.resolve();
			});
			var panel2 = new $.Deferred();
			$("#panel-2").load("./panel_2.svg", function(){
				updateColors($(this));
				panel2.resolve();
			});
			var panel3 = new $.Deferred();
			$("#panel-3").load("./panel_3.svg", function(){
				updateColors($(this));
				panel3.resolve();
			});

			$.when(panel1, panel2, panel3).done(function(){
				var zip = new JSZip();
				zip.file("panel_1.svg", $("#panel-1").html());
				zip.file("panel_2.svg", $("#panel-2").html());
				zip.file("panel_3.svg", $("#panel-3").html());
				var content = zip.generate({type:"blob"});
				saveAs(content, "tile_set.zip");
				$('#wait-modal').modal('hide')
			});
		}, 1000 );

	});
});

function loadSampleTile(){
	$("#sample-tile").load("./sample_tile.svg", function(){
		$("#sample-tile").find("svg")[0].setAttribute('viewBox', '0 0 ' + 160 + ' ' + 160);
		$("#sample-tile").find("svg")[0].setAttribute('preserveAspectRatio', 'xMinYMin meet')
		$("#sample-tile").find("svg")[0].setAttribute("width", "400");
		$("#sample-tile").find("svg")[0].setAttribute("height", "400");
		updateColors($(this));
	});
}

function convertImageToCanvas(image) {
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	    if(image.id) {
	        canvas.id = image.id;
	    }
	    if(image.className) {
	        canvas.className = image.className;
	    }
	canvas.getContext("2d").drawImage(image, 0, 0);

	return canvas;
}

function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}

