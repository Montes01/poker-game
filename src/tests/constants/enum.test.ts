import {playerType, inputTypes, ioEvents, } from "../../lib/constants/declarations"

describe("enum", () => {
  it("should match the snapshot", () => {
    expect(playerType).toMatchSnapshot()
    expect(inputTypes).toMatchSnapshot()
    expect(ioEvents).toMatchSnapshot()
  })
})
