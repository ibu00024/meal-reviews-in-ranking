describe("ReviewPage", function () {

  it("successfully submits a review with add restaurant", function () {
    cy.visit("/submit");

    // Search for a restaurant
    cy.get("#restaurant_name").type("d");
    cy.get(".search-button").click();

    // Enter Google Maps URL in the modal
    cy.get(".modal-container .modal-content .form__input").type(
      "https://maps.app.goo.gl/tLRsNtcjUxgi1DCn6"
    );

    // Expect to add restau SUCCESSFULLY
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Restaurant added successfully!");
    });

    // Click "Add Restaurant" button in modal
    cy.get(".modal-container .modal-content .button:nth-child(4)").click();

    // Fill out the review form
    cy.get("#menu_name").type("ramen");
    cy.get("#menu_category").select("1");
    cy.get(".star-rating").should("exist");

    // Click the 3rd star
    cy.get(".star-rating .star")
      .eq(2)
      .should("be.visible")
      .click({ force: true });
    cy.get("#menu_price").type("1500");
    cy.get("#comment").type("Delicious ramen!");

    // Upload image
    cy.get('input[type=file]').selectFile('cypress/fixtures/food3.jpg');
    cy.get(".upload-button").click();

    // Submit review
    cy.get(".submit-button").click();

    // Check for successful submission modal
    cy.get(".modal-container .modal-content h3")
      .should("contain.text", "Submission Successful!");

    // Close success modal and return home
    cy.get(".modal-container .modal-content button").click();

    //  Wait for the search bar to appear
    cy.get(".search-bar-container", { timeout: 5000 }).should("exist");

    // Check for the button inside the search bar to ensure that it is HomaePage
    cy.get(".search-bar-container > button")
      .should("be.visible")
      .should("contain.text", "Add Review");
  });

  it("successfully submits a review with an existing restaurant", function () {
    cy.visit("/submit");
  
    // Fill in Username
    cy.get("#username").type("username");
  
    // Enter Restaurant Name and Verify Autocomplete
    cy.get("#restaurant_name").type("sushiro").blur();
  
    // Click Search Button
    cy.get(".search-button").click();
    
    // Check if the restaurant name is autofilled from the API response
    cy.get("#restaurant_name", { timeout: 5000 }).should("have.value", "Sushiro - Seika-cho");
  
    // Fill in Menu Details
    cy.get("#menu_name").type("sushi");
    cy.get("#menu_category").select("2");
    
    // Select Star Rating (3rd star)
    cy.get(".star-rating .star:nth-child(3)").click();
  
    // Enter Price and Comment
    cy.get("#menu_price").type("2400");
    cy.get("#comment").type("Delicious sushi!");
  
    // Upload Image (Using Cypress selectFile)
    cy.get("#image_upload").selectFile("cypress/fixtures/food3.jpg");
  
    // Click Upload Button
    cy.get(".upload-button").click();
  
    // Submit Form
    cy.get(".submit-button").click();
  
    // Close Success Modal
    cy.get(".modal-container .modal-content button").click();
  });
     
})
