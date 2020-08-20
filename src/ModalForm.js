import ValidationError from "./ValidationError.js";

class ModalForm {
    constructor(window, form) {
        this.window = window;
        this.form = form;
        this.isEdit = false;
        this.nameInput = form.elements.name;
        this.positionInput = form.elements.position;
        this.emailInput = form.elements.email;
        this.phoneInput = form.elements.phone;
        this.errorNotification = form.getElementsByClassName('errorNotification')[0];
        this.closeOnEsc = this.closeOnEsc.bind(this);
    }

    setOpenButton(btn) {
        btn.addEventListener('click', (event) => {
            this.openWindow();
        })
    }

    setCloseButton(btn) {
        btn.addEventListener('click', (event) => {
            this.clearAndCloseWindow();
        })
    }

    openWindow() {
        document.addEventListener('keydown', this.closeOnEsc);
        this.window.hidden = false;
    }

    clearAndCloseWindow() {
        this.nameInput.value = this.positionInput.value = this.emailInput.value = this.phoneInput.value = this.errorNotification.innerHTML = '';
        this.isEdit = false;
        this.window.hidden = true;
    }

    closeOnEsc(event) {
        if (this.window.hidden) {
            document.removeEventListener('keydown', this.closeOnEsc);
            return;
        }

        if (event.key === 'Escape') {
            this.clearAndCloseWindow();
            document.removeEventListener('keydown', this.closeOnEsc);
        }
    }

    changeEditFlag(bool) {
        this.isEdit = bool;
    }

    handleSubmit(Employee, createItem, editItem) {
        this.form.onsubmit = (event) => {
            event.preventDefault();
            try {
                const employee = new Employee(this.nameInput.value, this.emailInput.value, this.phoneInput.value, this.positionInput.value);
                if (this.isEdit) {
                    editItem(employee);
                } else {
                    createItem(employee);
                }
                this.clearAndCloseWindow();
            } catch (e) {
                if (e instanceof ValidationError) {
                    this.errorNotification.innerHTML = e.message;
                    return;
                }
                throw e;
            }
        };
    }

    setValueAndOpen(employee) {
        this.nameInput.value = employee.name;
        this.positionInput.value = employee.position;
        this.emailInput.value = employee.email;
        this.phoneInput.value = employee.phone;
        this.openWindow();
    }
}

export default ModalForm;