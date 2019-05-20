import Input from '../Input';

export default class DateInput extends Input {
  constructor(settings) {
    super(settings);
  }

  getValue(){
    return new Date(this._value).getTime() / 1000;
  }
}
