import ValidationError from './ValidationError.js'

class Employee {
    constructor(name, email, phone, position) {
        this.name = name;
        this.position = position;
        this.email = email;
        this.phone = phone;
    }

    set name(name) {
        if (name.split(' ').length !== 2) {
            throw new ValidationError('Введите имя и фамилию');
        }
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set position(position) {
        if (position.length < 5) {
            throw new ValidationError('Должность должна содержать минимум 5 символов');
        }
        this._position = position;
    }

    get position() {
        return this._position;
    }

    set email(email) {
        let regexp = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/i;
        if (!regexp.test(email)) {
            throw new ValidationError('Проверьте электронный адрес');
        }

        this._email = email;
    }

    get email() {
        return this._email;
    }

    set phone(phone) {
        let regexp = /^\+?3?8?0\d{9}$/i;
        if (!regexp.test(phone.replace(/\s/g, ''))) {
            throw new ValidationError('Проверьте номер телефона');
        }

        this._phone = phone
    }

    get phone() {
        return this._phone;
    }
 }

export default Employee;