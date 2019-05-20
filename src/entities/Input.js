export default class Input {
  constructor(settings) {
    this.name = settings.name;
    this.label = settings.label || this.name;
    this.type = settings.type || 'text';
    this.rules = settings.rules || null;
    this._value = settings.value || '';
    this.className = settings.className;
  }

  set validator(validator) {
    this._validator = validator;
  }

  get validator() {
    return this._validator;
  }

  set value(value){
    this._value = value;
  }

  get value(){
    return this._value;
  }

  getValue(){
    return this._value;
  }

  validate() {
    return this._validator.validate();
  }

  getValue(){
    return this.value;
  }

  hasError() {
    return this.validator.errors.has(this.name);
  }

  getError() {
    return this.validator.errors.first(this.name);
  }
}
