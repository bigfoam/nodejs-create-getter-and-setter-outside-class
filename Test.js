class Test {
  static #privatePropertyDefs = {
    var1: {
      type: 'bool',
      defaultValue: false,
      isRequired: true,
    },
    var2: {
      type: 'int',
      defaultValue: null,
    },
  };

  #privateProperties = {
    // var1: Test.#privatePropertyDefs[var1].defaultValue,
    // var2: Test.#privatePropertyDefs[var1].defaultValue,
  };

  constructor() {
    Test.privatePropertieNames.map((name) => {
      this.#privateProperties[name] =
        Test.#privatePropertyDefs[name].defaultValue;
    });
  }

  static get privatePropertieNames() {
    return Object.keys(Test.#privatePropertyDefs);
  }

  getPrivateProperty(name) {
    if (!this.#privateProperties.hasOwnProperty(name)) {
      throw new Error(
        `Try to get value of property ${name} which does not exist`
      );
    }
    return this.#privateProperties[name];
  }

  setPrivateProperty(name, value) {
    if (!this.#privateProperties.hasOwnProperty(name)) {
      throw new Error(
        `Try to set value of property ${name} which does not exist`
      );
    }
    const { isRequired, type } = Test.#privatePropertyDefs[name];
    console.log(isRequired, type);
    return (this.#privateProperties[name] = value);
  }

  valueOf() {
    return {
      ...super.valueOf(),
      ...this.#privateProperties,
    };
  }
}

Test.privatePropertieNames.map((name) => {
  Object.defineProperty(Test.prototype, name, {
    get: function () {
      return this.getPrivateProperty(name);
    },
    set: function (value) {
      this.setPrivateProperty(name, value);
    },
  });
});

module.exports = Test;
