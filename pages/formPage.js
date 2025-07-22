const { expect } = require('@playwright/test');
class FormPage{

    
    constructor(page){
        this.page = page;
        this.fullName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.email = page.locator('#userEmail');
        // this.gender = page.locator('#genterWrapper');
        this.mobile = page.locator('#userNumber');
        // this.hobbies = page.locator('#hobbiesWrapper');
        this.currentAddress = page.locator('#currentAddress');
        // this.state = page.locator('#state');
        // this.city = page.locator('#city');
        this.submit = page.locator('#submit');
        this.output = page.locator('#output');
    }

    async selectGenderByLabelText(genderText) {
        const label = this.page.locator('#genterWrapper label', {
          hasText: new RegExp(`^${genderText}$`, 'i')  
        });
      
        await label.first().waitFor({ state: 'visible' });
        await label.first().click(); 
    }
      
      

    async selectHobbyByLabelText(hobbyText) {
        const hobbyMap = {
            Sports: 'hobbies-checkbox-1',
            Reading: 'hobbies-checkbox-2',
            Music: 'hobbies-checkbox-3'
        };
    
        if (Array.isArray(hobbyText)) {
            for (const hobby of hobbyText) {
                const hobbyId = hobbyMap[hobby];
                if (hobbyId) {
                    await this.page.locator(`label[for="${hobbyId}"]`).click();
                }
            }
        } else {
            const hobbyId = hobbyMap[hobbyText];
            if (hobbyId) {
                await this.page.locator(`label[for="${hobbyId}"]`).click();
            }
        }
    }


    async fillForm(data) {
        console.log('Form data received:', data); 

        await this.fullName.fill(data.FirstName);
        await this.lastName.fill(data.LastName);
        await this.email.fill(data.Email);

        // Select the Radio Button from the data passed
        await this.selectGenderByLabelText(data.Gender);

        // Select the Checkboxes from the data passed
        await this.selectHobbyByLabelText(data.Hobbies);
        
        await this.mobile.fill(String(data.Mobile));
        await this.currentAddress.fill(data.CurrentAddress);
        

    // Handle custom dropdown for State
    await this.page.waitForSelector('#state');
    await this.page.click('#state');

    await this.page.waitForSelector('#react-select-3-option-0');
    await this.page.click('#react-select-3-option-0'); // Select NCR
    await this.page.waitForTimeout(1000);

    // Handle custom dropdown for City
    await this.page.waitForSelector('#city');
    await this.page.click('#city');
    await this.page.waitForSelector('#react-select-4-option-0');
    await this.page.click('#react-select-4-option-0'); // Select Delhi
    await this.page.waitForTimeout(1000); 

    await this.submitForm();
    }

    async verifySubmission(expected) {
        const outputRows = this.page.locator('.table-responsive tbody tr');
        try {
            for (let i = 0; i < await outputRows.count(); i++) {
                const label = await outputRows.nth(i).locator('td').first().textContent();
                const value = await outputRows.nth(i).locator('td').nth(1).textContent();
                console.log(label, value);
            
                switch (label.trim()) {
                    case 'Student Name':
                        expect(value.trim()).toBe(`${expected.FirstName} ${expected.LastName}`);
                        break;
                    case 'Student Email':
                        expect(value.trim()).toBe(expected.Email);
                        break;
                    case 'Gender':
                        expect(value.trim()).toBe(expected.Gender);
                        break;
                    case 'Mobile':
                        expect(value.trim()).toBe(String(expected.Mobile));
                        break;
                    case 'Hobbies':
                        if (expected.Hobbies && expected.Hobbies.length > 0) {
                            const expectedHobbies = Array.isArray(expected.Hobbies)
                                ? expected.Hobbies.join(', ')
                                : expected.Hobbies;
                            expect(value.trim()).toBe(expectedHobbies);
                        } else {
                            expect(value.trim()).toBe(''); 
                        }
                        break;
                    case 'Address':
                        expect(value.trim().replace(/\s+/g, ' ')).toContain(expected.CurrentAddress.trim());
                        break;
                    case 'State and City':
                        expect(value.trim()).toBe(`${expected.State} ${expected.City}`);
                        break;
                }
            }
            return true;
        }
        catch (e) {
            return false; 
        }

    }
      
    

    async submitForm() {
        await this.submit.click();
        console.log('Form submitted Successfully');
        await this.page.waitForTimeout(2000); 
    }

}

module.exports = FormPage;