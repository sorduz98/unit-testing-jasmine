import { routes } from "./app-routing.module";
import { PinsComponent } from "./components/pins/pins.component";

describe('App Routing', () => {
  beforeAll(() => {
    console.log()
  });
  beforeEach(() => {

  });
  afterAll(() => {

  });
  afterEach(() => {

  });

  it('Should have app as path', () => {
    expect(routes[0].path).toBe('app');
  });

  it('Should match the children', () => {
    expect(routes[0].children).toContain({
      path: 'pins',
      component: PinsComponent
    },);
  });

});
