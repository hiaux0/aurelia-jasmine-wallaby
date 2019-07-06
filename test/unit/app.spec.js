import { App } from '../../src/app';
import 'aurelia-polyfills';
import { StageComponent } from 'aurelia-testing';
import { bootstrap } from 'aurelia-bootstrapper';
import { PLATFORM } from 'aurelia-pal';

const view = `
  <testerino message.bind="message"></testerino>
`;

const bindings = {
  message: 'Helloo'
};

describe('the app', () => {
  let component;
  beforeEach(() => {
    component = StageComponent
      // .withResources(PLATFORM.moduleName('testerino/testerino'))
      .withResources(PLATFORM.moduleName('testerino/testerino.html') && PLATFORM.moduleName('testerino/testerino'))
      .inView(view)
      .boundTo(bindings);
    component.bootstrap(aurelia => {
      return aurelia.use
        .standardConfiguration()
        .defaultResources();
    });
  });

  afterEach(() => {
    component.dispose();
  });


  // it('says hello', () => {
  //   expect(new App().message).toBe('Hello World!');
  // });

  it('Should bind message in view', (done) => {
    component.create(bootstrap).then(() => {
      const { element, html, viewModel } = component;
      const tt = document.querySelector('#testerino');
      console.log('TCL: tt', tt);
      expect(tt.querySelector('#text').textContent.trim()).toBe('Helloo');
      // expect(tt.innerHTML).toBe('Hello');
      done();
    });
  });
});

