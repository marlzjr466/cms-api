module.exports = plop => {
  plop.load('../utility.js', {}, {
    helpers: true
  })

  plop.setGenerator('module', {
    description: 'Generate module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Generate module:',
        validate (input) {
          if (isNaN(input)) {
            return true
          }
          console.log('Number is not a valid file name!\n')
        }
      }
    ],
    actions: [
      {
        type: 'add',
        path: '../../resources/{{ kebabCase name }}/controller.js',
        templateFile: './templates/controller.hbs',
        skipIfExists: false,
        force: true
      },
      {
        type: 'add',
        path: '../../resources/{{ kebabCase name }}/route.js',
        templateFile: './templates/route.hbs',
        skipIfExists: false,
        force: true
      },
      {
        type: 'add',
        path: '../../resources/{{ kebabCase name }}/service.js',
        templateFile: './templates/service.hbs',
        skipIfExists: false,
        force: true
      }
      // {
      //   type: 'add',
      //   path: '../../src/resources/{{ kebabCase name }}/service.spec.js',
      //   templateFile: './templates/service.spec.hbs',
      //   skipIfExists: false,
      //   force: true
      // },
      // {
      //   type: 'add',
      //   path: '../../src/resources/{{ kebabCase name }}/helpers.js',
      //   templateFile: './templates/helpers.hbs',
      //   skipIfExists: false,
      //   force: true
      // }
    ]
  })
}
