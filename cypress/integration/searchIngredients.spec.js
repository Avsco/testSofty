describe("Comecon App", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	describe("Test Case 22", () => {
		it("Verify that the text in the search bar have matches", () => {
			const serachWord = "lec";
			cy.get("input.MuiInputBase-input").type(serachWord);
			cy.wait(2000);
			cy.get("ul.MuiAutocomplete-listbox > li").each(($li) => {
				expect($li.text()).to.match(RegExp(serachWord));
			});
		});
	});
});
