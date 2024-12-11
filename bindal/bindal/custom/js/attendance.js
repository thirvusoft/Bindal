frappe.ui.form.on("Attendance", {
    onload(frm) {
        frm.set_value({
          'custom_enable': 1
        })
    }
    },
);