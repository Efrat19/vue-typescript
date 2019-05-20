import Input from '../Input';

export default class PhoneInput extends Input {
  constructor(settings) {
    super(settings);
  }

  getValue(){
    const phoneAllowedChars = ['-', '+', '(', ')', ' '];
    let clean = this.value;

    phoneAllowedChars.forEach(char =>
      clean = clean.split(char).join(''));

    return clean;
  }
}
