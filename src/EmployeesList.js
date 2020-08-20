class EmployeesList {
    constructor(list, openFormForEdit, isEdit) {
        this.list = list;
        this.openFormForEdit = openFormForEdit;
        this.isEdit = isEdit;
        this.editEmloyee = null;
        this.employeeMap = new Map();
    }

    createItem(employee) {
        const item = document.createElement('li');
        item.innerHTML = this.getItemHtml(employee);
        this.list.append(item);
        this.employeeMap.set(item, employee);

        item.onclick = (event) => {
            if (event.target.matches('.delete')) {
                this.deleteItem(event.target.closest('li'))
            }
            if (event.target.matches('.edit')) {
                this.isEdit(true);
                this.editEmloyee = event.target.closest('li');
                this.openFormForEdit(this.employeeMap.get(this.editEmloyee));
            }
        };
    }

    deleteItem(item) {
        if (confirm('Удалить?')) {
            this.employeeMap.delete(item);
            item.remove();
        }
    }

    editItem(employee) {
        this.editEmloyee.innerHTML = this.getItemHtml(employee);
        this.employeeMap.set(this.editEmloyee, employee);
        this.editEmloyee = null;
        this.isEdit(false);
    }

    getItemHtml(employee) {
        return (
            `<div class="button edit"></div>
            <div class="button delete"></div>
            <p class="employee-name"><strong>${employee.name}</strong></p>
            <p>${employee.position}</p>
            <p>Email: ${employee.email} | Телефон: ${employee.phone}</p>`
        )
    }
}

export default EmployeesList;