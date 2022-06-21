// bind events

frappe.ui.form.on("ToDo", {
	onload: function(frm) {
		frm.set_query("reference_type", function(txt) {
			return {
				"filters": {
					"issingle": 0,
				}
			};
		});
	},
	refresh: function(frm) {
		if(frm.doc.reference_type && frm.doc.reference_name) {
			frm.add_custom_button(__(frm.doc.reference_name), function() {
				frappe.set_route("Form", frm.doc.reference_type, frm.doc.reference_name);
			});
		}

		if (!frm.doc.__islocal) {
			if(frm.doc.status!=="Closed") {
				frm.add_custom_button(__("Close"), function() {
					frm.set_value("status", "Closed");
					frm.save(null, function() {
						// back to list
						frappe.set_route("List", "ToDo");
					});
				}, "fa fa-check", "btn-success");
			} else {
				frm.add_custom_button(__("Reopen"), function() {
					frm.set_value("status", "Open");
					frm.save();
				}, null, "btn-default");
			}
			frm.add_custom_button(__("New"), function() {
				frappe.new_doc("ToDo")
			}, null, "btn-default");
		}
	}
});

frappe.ui.form.on('ToDo', {
	refresh:function(frm,cdt,cdn)
		{
			var d = locals[cdt][cdn];
			if(d.pch_type == "Individual")
			{
			frm.toggle_display("pch_frequency", false);
			frm.toggle_display("pch_frequency_days", false);
			frm.toggle_display("pch_reminder", false);
			}
			}
		});
	frappe.ui.form.on('ToDo', {
	pch_type:function(frm,cdt,cdn)
		{
			var d = locals[cdt][cdn];
			if(d.pch_type == "Individual")
			{
			frm.toggle_display("pch_frequency", false);
			frm.toggle_display("pch_frequency_days", false);
			frm.toggle_display("pch_reminder", false);
			}
			else if(d.pch_type == "Corporate")
			{
			frm.toggle_display("pch_frequency", true);
			frm.toggle_display("pch_frequency_days", false);
			frm.toggle_display("pch_reminder", false);
			}
			}
		});
	frappe.ui.form.on('ToDo', {
	pch_frequency:function(frm,cdt,cdn)
		{
			var d = locals[cdt][cdn];
			if(d.pch_frequency == "Once in___")
			{
			frm.toggle_display("pch_frequency_days", true);
			frm.toggle_display("pch_reminder", true);
			}
			else
			{
			frm.toggle_display("pch_frequency_days", false);
			frm.toggle_display("pch_reminder", false);
			}
	}});
	
	frappe.ui.form.on('ToDo', {
	add_user:function(frm,cdt,cdn)
		{
		var d = locals[cdt][cdn];
		var user = d.user;
		var recipient_list = d.pch_recipient_list;
		if(recipient_list)
		{
		  recipient_list = recipient_list + "\n" + user;
		  
		 }
		else
		{
		  recipient_list = user; 
		}
		frm.set_value("pch_recipient_list",recipient_list);
	
		}
	});
		
	frappe.ui.form.on('ToDo', {
	clear:function(frm,cdt,cdn)
		{
			var d = locals[cdt][cdn];
			var pch_recipient_list = d.pch_recipient_list;
			if(pch_recipient_list)
			{
			 frm.set_value('pch_recipient_list', ' ')
		
			}}
		});