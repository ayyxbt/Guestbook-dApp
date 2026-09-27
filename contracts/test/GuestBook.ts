import { expect } from "chai";
import { network } from "hardhat";

describe("Guestbook", function () {
  let ethers: any;


  before(async function () {
    ({ ethers } = await network.create());
  });

  async function deployGuestbookFixture() {
    const [owner, addr1] = await ethers.getSigners();
    const Guestbook = await ethers.getContractFactory("Guestbook");
    const guestbook = await Guestbook.deploy();
    return { guestbook, owner, addr1 };
  }

  it("Should allow a user to make a post", async function () {
    const { guestbook, addr1 } = await deployGuestbookFixture();
    await guestbook.connect(addr1).makePost("Hello, Hardhat!");
    
    const length = await guestbook.getPostLength();
    expect(length).to.equal(1n);

    const entry = await guestbook.getEntry(0);
    expect(entry.post).to.equal("Hello, Hardhat!");
  });

  it("Should revert if a user posts twice", async function () {
    const { guestbook, addr1 } = await deployGuestbookFixture();
    await guestbook.connect(addr1).makePost("First post");
    await expect(
      guestbook.connect(addr1).makePost("Second post")
    ).to.be.revertedWithCustomError(guestbook, "HasAlreadyPosted");
  });
});