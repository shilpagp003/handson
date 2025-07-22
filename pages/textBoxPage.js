class TextBoxPage {
  constructor(page) {
    this.page = page;
    this.fullName = page.locator('#userName');
    this.email = page.locator('#userEmail');
    this.currentAddress = page.locator('#currentAddress');
    this.permanentAddress = page.locator('#permanentAddress');
    this.submit = page.locator('#submit');
    this.output = page.locator('#output');
  }

  async fillForm(data) {
    // console.log('Form data received:', data); 
  
    await this.fullName.fill(data.FullName);
    await this.email.fill(data.Email);
    await this.currentAddress.fill(data.CurrentAddress);
    await this.permanentAddress.fill(data.PermanentAddress);
    await this.submit.click();
  }

  async verifySubmission(data) {
    const name = await this.page.locator('#name').textContent();
    const email = await this.page.locator('#email').textContent();
    const currentAddress = await this.page.locator('#output #currentAddress').textContent();
    const permanentAddress = await this.page.locator('#output #permanentAddress').textContent();

    console.log('Verifying FullName: ', name);
    console.log('Verifying Email: ', email);
    console.log('Verifying Current Address: ', currentAddress);
    console.log('Verifying Permanent Address: ', permanentAddress);


    return {
      name: name.trim() === `Name:${data.FullName}`,
      email: email.trim() === `Email:${data.Email}`,
      currentAddress: currentAddress.trim() === `Current Address:${data.CurrentAddress}`,
      permanentAddress: permanentAddress.trim() === `Permanent Address:${data.PermanentAddress}`
    }
  }
}

module.exports = TextBoxPage; 