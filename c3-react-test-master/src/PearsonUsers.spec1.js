import React from "react";
import { PearsonUsers } from "./PearsonUsers";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, {shallow, mount, render} from "enzyme";

describe("PearsonUsers", () => {

  beforeEach(() => {
    window.fetch = jest.fn().mockImplementation(() => ({
        status: 200,
        json: () => new Promise((resolve, reject) => {
          resolve({
            users: [{item: 'nuts', id: 10}, {item: 'greens', id: 3}, {item: 'reds', id: 4}]
          })
        })
    }));
  });

  it('componentDidMount should fetch, and put result in state if ok', async () => {
    
    const renderedComponent = await shallow(<PearsonUsers />).instance().componentDidMount();
    renderedComponent.update();
    expect(renderedComponent.state('users').length).toEqual(3);
  })
});
