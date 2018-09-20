import React from "react";
import { shallow } from "enzyme";
import UserProfile from "./UserProfile";

describe("UserProfile", () => {
  let component;

  beforeEach(() => {
    component = shallow(<UserProfile />);
  });

  it("renders a button with text", () => {
    const button = component.find("button");
    expect(button.text()).toEqual("Delete");
  });

  it("renders a img with classname", () => {
    const img = component.find("img");
    expect(img.hasClass('prof-img')).toEqual(true);
  });

  it("renders one div with classname as user-img", () => {
    expect(component.find('.user-name').length).toBe(1);
  });

  it("renders one div with classname as user-image", () => {
    expect(component.find('.user-image').length).toBe(1);
  });

  it("renders one div with classname as profile-container", () => {
    expect(component.find('.profile-container').length).toBe(1);
  });

  it("renders one div with classname as user-profile", () => {
    expect(component.find('.user-profile').length).toBe(1);
  });

  it("renders total 4 div", () => {
    expect(component.find('div').length).toBe(4);
  });

});
