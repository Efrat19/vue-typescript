import _ from 'lodash';

export default class Form {
  constructor(settings) {
    this.inputs = settings.inputs || {};
    this.successCallback = settings.successCallback;
    this.endpoint = settings.endpoint;
  }

  async validate() {
    return Promise.all(Object.keys(this.inputs)
      .map(input => this.inputs[input].validate()));
  }

  getData() {
    const data = {};

    Object.keys(this.inputs).forEach((inputName) => {
      const input = this.inputs[inputName];

      data[input.name] = input.getValue();
    });

    return data;
  }

  submit() {
    fetch(
      this.endpoint, {
        method: 'POST',
        body: JSON.stringify(this.getData()),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => {
        response
          .json()
          .then((response) => {
            if (_.isFunction(this.successCallback)) {
              this.successCallback();
            }
          });

        this.msg = 'Success';
      });
  }

  input(name) {
    return this.inputs[name];
  }
}
