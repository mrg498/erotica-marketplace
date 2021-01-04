const isAuth = require("../middleware/is-auth");

describe("MIDDLEWARE", () => {
	describe("is-auth", () => {
		test("if creator is not authorized, call res.redirect", function() {
			const req = {
				session: {
					creatorLoggedIn: false
				}
			};
			const res = {
				redirect: jest.fn(() => {
					return "redirect";
				})
            };
            const mockNext = jest.fn();
			expect(isAuth.creatorIsAuth(req, res, mockNext)).toBe("redirect");
			expect(mockNext.mock.calls.length).toBe(0);
		});
		test("if creator is authorized, call next", () => {
			const req = {
				session: {
					creatorLoggedIn: true
				}
            };
            const mockNext = jest.fn();
			isAuth.creatorIsAuth(req, {}, mockNext);
            expect(mockNext.mock.calls.length).toBe(1);
        });
        test("if customer is not authorized, call res.redirect", function() {
			const req = {
				session: {
					customerLoggedIn: false
				}
			};
			const res = {
				redirect: jest.fn().mockReturnValue('redirect')
            };
            const mockNext = jest.fn();
			expect(isAuth.customerIsAuth(req, res, mockNext)).toBe("redirect");
			expect(mockNext.mock.calls.length).toBe(0);
		});
		test("if customer is authorized, call next", () => {
			const req = {
				session: {
					customerLoggedIn: true
				}
            };
            const mockNext = jest.fn();
			isAuth.customerIsAuth(req, {}, mockNext);
			expect(mockNext.mock.calls.length).toBe(1);
		});
	});
});
