// Copyright (c) 2023, jyoti and contributors
// For license information, please see license.txt

frappe.ui.form.on('Incoming Material Inspection', {
    item_name: function(frm) {
      if (frm.doc.item_name){
        frappe.db.get_doc("Item", frm.doc.item_name).then(function(item) {
            if (item.incoming_material_inspection_table) {
                var characteristicsList = [];
                var specificationsList = [];
                var measurementTechniquesList = [];
                var minValueList=[]
                var maxValueList=[]
                item.incoming_material_inspection_table.forEach(function(row) {
                    if (row.check === 1) {

                        characteristicsList.push(row.product_characteristics);
                        specificationsList.push(row.product_specifications);
                        measurementTechniquesList.push(row.measurement_technique);
                        minValueList.push(row.min_value);
                        maxValueList.push(row.max_value);
                    }
                });
				frappe.model.set_value(frm.doc.doctype, frm.doc.name, "incoming_material_inspection_table", []);
				for (var i = 0; i < characteristicsList.length; i++) {
					var child = frm.add_child("incoming_material_inspection_table");
					frappe.model.set_value(child.doctype, child.name, "product_characteristics", characteristicsList[i]);
					frappe.model.set_value(child.doctype, child.name, "product_specifications", specificationsList[i]);
					frappe.model.set_value(child.doctype, child.name, "measurement_technique", measurementTechniquesList[i]);
          frappe.model.set_value(child.doctype, child.name, "min_value", minValueList[i]);
					frappe.model.set_value(child.doctype, child.name, "max_value", maxValueList[i]);

				}
            }
			frm.refresh_field("incoming_material_inspection_table"); 
        }); 
    }},
    length:function(frm){
        var value1 = frm.doc.length
        var value2 = frm.doc.length_1
        var value3 = frm.doc.length_2
        var char = "Length (mm)"
        var remark='remark'
        remarkvalue(frm,value1,value2,value3,char,remark)
    },
    length_1:function(frm){
        var value1 = frm.doc.length
        var value2 = frm.doc.length_1
        var value3 = frm.doc.length_2
        var char = "Length (mm)"
        var remark='remark'
        remarkvalue(frm,value1,value2,value3,char,remark)
    },
    length_2:function(frm){
        var value1 = frm.doc.length
        var value2 = frm.doc.length_1
        var value3 = frm.doc.length_2
        var char = "Length (mm)"
        var remark='remark'
        remarkvalue(frm,value1,value2,value3,char,remark)
    },

    width:function(frm){
        var value1 = frm.doc.width
        var value2 = frm.doc.width_1
        var value3 = frm.doc.width_2
        var char = "Width (mm)"
        var remark='remark_1'
        remarkvalue(frm,value1,value2,value3,char,remark)
    },
    width_1:function(frm){
      var value1 = frm.doc.width
      var value2 = frm.doc.width_1
      var value3 = frm.doc.width_2
      var char = "Width (mm)"
      var remark='remark_1'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },
    width_2:function(frm){
      var value1 = frm.doc.width
      var value2 = frm.doc.width_1
      var value3 = frm.doc.width_2
      var char = "Width (mm)"
      var remark='remark_1'
      remarkvalue(frm,value1,value2,value3,char,remark)
  },

    height:function(frm){
      var value1 = frm.doc.height
      var value2 = frm.doc.height_1
      var value3 = frm.doc.height_2
      var char = "Height (mm)"
      var remark='remark_2'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },
    height_1:function(frm){
      var value1 = frm.doc.height
      var value2 = frm.doc.height_1
      var value3 = frm.doc.height_2
      var char = "Height (mm)"
      var remark='remark_2'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },
    height_2:function(frm){
      var value1 = frm.doc.height
      var value2 = frm.doc.height_1
      var value3 = frm.doc.height_2
      var char = "Height (mm)"
      var remark='remark_2'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },

    no_of_ply:function(frm){
      var value1 = frm.doc.no_of_ply
      var value2 = frm.doc.no_of_ply_1
      var value3 = frm.doc.no_of_ply_2
      var char = "No of ply (mm)"
      var remark='remark_3'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },
    no_of_ply_1:function(frm){
      var value1 = frm.doc.no_of_ply
      var value2 = frm.doc.no_of_ply_1
      var value3 = frm.doc.no_of_ply_2
      var char = "No of ply (mm)"
      var remark='remark_3'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },
    no_of_ply_2:function(frm){
      var value1 = frm.doc.no_of_ply
      var value2 = frm.doc.no_of_ply_1
      var value3 = frm.doc.no_of_ply_2
      var char = "No of ply (mm)"
      var remark='remark_3'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },

    bursting_strength:function(frm){
      var value1 = frm.doc.bursting_strength
      var value2 = frm.doc.bursting_strength_1
      var value3 = frm.doc.bursting_strength_2
      var char = "Bursting strength of corrugated board (Kg/cm2)"
      var remark='remark_4'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },
    bursting_strength_1:function(frm){
      var value1 = frm.doc.bursting_strength
      var value2 = frm.doc.bursting_strength_1
      var value3 = frm.doc.bursting_strength_2
      var char = "Bursting strength of corrugated board (Kg/cm2)"
      var remark='remark_4'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },
    bursting_strength_2:function(frm){
      var value1 = frm.doc.bursting_strength
      var value2 = frm.doc.bursting_strength_1
      var value3 = frm.doc.bursting_strength_2
      var char = "Bursting strength of corrugated board (Kg/cm2)"
      var remark='remark_4'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },

    weight:function(frm){
      var value1 = frm.doc.weight
      var value2 = frm.doc.weight_1
      var value3 = frm.doc.weight_2
      var char = "Weight (Kg)"
      var remark='remark_10'
      remarkvalue(frm,value1,value2,value3,char,remark)
    }, 
    weight_1:function(frm){
      var value1 = frm.doc.weight
      var value2 = frm.doc.weight_1
      var value3 = frm.doc.weight_2
      var char = "Weight (Kg)"
      var remark='remark_10'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },
     weight_2:function(frm){
      var value1 = frm.doc.weight
      var value2 = frm.doc.weight_1
      var value3 = frm.doc.weight_2
      var char = "Weight (Kg)"
      var remark='remark_10'
      remarkvalue(frm,value1,value2,value3,char,remark)
    },


    paper_thickness_sheet1:function(frm){
      var value1 = frm.doc.paper_thickness_sheet1
      var value2 = frm.doc.paper_thickness_1_sheet1
      var value3 = frm.doc.paper_thickness_2_sheet1
      var char = "Sheet - 1"
      var remark='remark_5'
      paperThickness(frm,value1,value2,value3,char,remark)
    },
    paper_thickness_1_sheet1:function(frm){
      var value1 = frm.doc.paper_thickness_sheet1
      var value2 = frm.doc.paper_thickness_1_sheet1
      var value3 = frm.doc.paper_thickness_2_sheet1
      var char = "Sheet - 1"
      var remark='remark_5'
      paperThickness(frm,value1,value2,value3,char,remark)
    },
    paper_thickness_2_sheet1:function(frm){
      var value1 = frm.doc.paper_thickness_sheet1
      var value2 = frm.doc.paper_thickness_1_sheet1
      var value3 = frm.doc.paper_thickness_2_sheet1
      var char = "Sheet - 1"
      var remark='remark_5'
      paperThickness(frm,value1,value2,value3,char,remark)
    },


    paper_thickness_sheet2:function(frm){
      var value1 = frm.doc.paper_thickness_sheet2
      var value2 = frm.doc.paper_thickness_1_sheet2
      var value3 = frm.doc.paper_thickness_2_sheet2
      var char = "Sheet - 2"
      var remark='remark_6'
      paperThickness(frm,value1,value2,value3,char,remark)
    },  
    paper_thickness_1_sheet2:function(frm){
      var value1 = frm.doc.paper_thickness_sheet2
      var value2 = frm.doc.paper_thickness_1_sheet2
      var value3 = frm.doc.paper_thickness_2_sheet2
      var char = "Sheet - 2"
      var remark='remark_6'
      paperThickness(frm,value1,value2,value3,char,remark)
    },   
    paper_thickness_2_sheet2:function(frm){
      var value1 = frm.doc.paper_thickness_sheet2
      var value2 = frm.doc.paper_thickness_1_sheet2
      var value3 = frm.doc.paper_thickness_2_sheet2
      var char = "Sheet - 2"
      var remark='remark_6'
      paperThickness(frm,value1,value2,value3,char,remark)
    },


    paper_thickness_sheet3:function(frm){
      var value1 = frm.doc.paper_thickness_sheet3
      var value2 = frm.doc.paper_thickness_1_sheet3
      var value3 = frm.doc.paper_thickness_2_sheet3
      var char = "Sheet - 3"
      var remark='remark_7'
      paperThickness(frm,value1,value2,value3,char,remark)
    }, 
    paper_thickness_1_sheet3:function(frm){
      var value1 = frm.doc.paper_thickness_sheet3
      var value2 = frm.doc.paper_thickness_1_sheet3
      var value3 = frm.doc.paper_thickness_2_sheet3
      var char = "Sheet - 3"
      var remark='remark_7'
      paperThickness(frm,value1,value2,value3,char,remark)
    },
    paper_thickness_2_sheet3:function(frm){
      var value1 = frm.doc.paper_thickness_sheet3
      var value2 = frm.doc.paper_thickness_1_sheet3
      var value3 = frm.doc.paper_thickness_2_sheet3
      var char = "Sheet - 3"
      var remark='remark_7'
      paperThickness(frm,value1,value2,value3,char,remark)
    },


});

function remarkvalue(frm, value1, value2, value3, char, remark) {

    frappe.db.get_doc("Item", frm.doc.item_name).then(function (item) {
      var result1 = false;
      var result2 = false;
      var result3 = false;
  
      item.incoming_material_inspection_table.forEach(function (row) {
        if (row.product_characteristics === char) {
          if (value1 >= row.min_value && value1 <= row.max_value) {
            result1 = true;
          }
          if (value2 >= row.min_value && value2 <= row.max_value) {
            result2 = true;
          }
          if (value3 >= row.min_value && value3 <= row.max_value) {
            result3 = true;
          }
        }
      });
  
      var finalResult = result1 && result2 && result3;
      if (finalResult ==true){
        frm.set_value(remark,"Accepted")
      }
      else{
        frm.set_value(remark,"Not Accepted")
      }
    });
  }

  function paperThickness(frm, value1, value2, value3, char, remark) {

    frappe.db.get_doc("Item", frm.doc.item_name).then(function (item) {
      var result1 = false;
      var result2 = false;
      var result3 = false;
  
      item.incoming_material_inspection_table.forEach(function (row) {
        if (row.product_specifications === char) {
          if (value1 >= row.min_value && value1 <= row.max_value) {
            result1 = true;
          }
          if (value2 >= row.min_value && value2 <= row.max_value) {
            result2 = true;
          }
          if (value3 >= row.min_value && value3 <= row.max_value) {
            result3 = true;
          }
        }
      });
  
      var finalResult = result1 && result2 && result3;
      if (finalResult ==true){
        frm.set_value(remark,"Accepted")
      }
      else{
        frm.set_value(remark,"Not Accepted")
      }
    });
  }