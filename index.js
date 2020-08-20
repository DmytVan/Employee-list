import Employee from './src/Employee.js';
import ModalForm from './src/ModalForm.js'
import EmployeesList from './src/EmployeesList.js'

const modalForm = new ModalForm(document.getElementById('modal'), document.getElementById('modalForm'));
const employeesList = new EmployeesList(document.getElementById('employeeList'), modalForm.setValueAndOpen.bind(modalForm), modalForm.changeEditFlag.bind(modalForm));

modalForm.setOpenButton(document.getElementById('openModal'));
modalForm.setCloseButton(document.getElementById('closeModal'));
modalForm.handleSubmit(Employee, employeesList.createItem.bind(employeesList), employeesList.editItem.bind(employeesList));
